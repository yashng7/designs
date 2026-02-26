import type { A11yIssue } from './types';
import { parseColor } from './utils';

function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(color1: string, color2: string): number | null {
  const c1 = parseColor(color1);
  const c2 = parseColor(color2);
  if (!c1 || !c2) return null;
  const l1 = getRelativeLuminance(...c1);
  const l2 = getRelativeLuminance(...c2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getEffectiveBackground(el: Element): string {
  let current: Element | null = el;
  while (current) {
    const bg = getComputedStyle(current).backgroundColor;
    const parsed = parseColor(bg);
    if (parsed && (parsed[0] !== 0 || parsed[1] !== 0 || parsed[2] !== 0)) {
      const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)/);
      if (match) {
        const alpha = match[4] ? parseFloat(match[4]) : 1;
        if (alpha > 0.1) return bg;
      }
    }
    if (bg === 'rgb(255, 255, 255)' || bg === 'rgb(0, 0, 0)') return bg;
    current = current.parentElement;
  }
  return 'rgb(255, 255, 255)';
}

export function analyzeDesign(container: HTMLElement): A11yIssue[] {
  const issues: A11yIssue[] = [];

  // Check heading hierarchy
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  headings.forEach((h) => {
    const level = parseInt(h.tagName[1]);
    if (level > lastLevel + 1 && lastLevel > 0) {
      issues.push({
        type: 'warning',
        category: 'heading',
        message: `Heading level skipped: <${h.tagName.toLowerCase()}> after <h${lastLevel}>`,
        element: h.textContent?.slice(0, 40) || h.tagName,
      });
    }
    lastLevel = level;
  });

  // Check images for alt text
  const images = container.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.getAttribute('alt')) {
      issues.push({
        type: 'error',
        category: 'alt-text',
        message: 'Image missing alt text',
        element: `<img src="${img.src?.slice(0, 50)}">`,
      });
    }
  });

  // Check buttons and links for accessible names
  const interactives = container.querySelectorAll('button, a');
  interactives.forEach((el) => {
    const text = el.textContent?.trim();
    const ariaLabel = el.getAttribute('aria-label');
    const ariaLabelledBy = el.getAttribute('aria-labelledby');
    if (!text && !ariaLabel && !ariaLabelledBy) {
      issues.push({
        type: 'error',
        category: 'aria',
        message: `<${el.tagName.toLowerCase()}> missing accessible name`,
        element: el.outerHTML.slice(0, 80),
      });
    }
  });

  // Check text contrast
  const textEls = container.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, li, td, th, label');
  const checked = new Set<string>();
  textEls.forEach((el) => {
    const style = getComputedStyle(el);
    const color = style.color;
    const bg = getEffectiveBackground(el);
    const key = `${color}|${bg}`;
    if (checked.has(key)) return;
    checked.add(key);

    const ratio = getContrastRatio(color, bg);
    if (ratio !== null && ratio < 4.5) {
      issues.push({
        type: ratio < 3 ? 'error' : 'warning',
        category: 'contrast',
        message: `Low contrast ratio ${ratio.toFixed(2)}:1 (needs 4.5:1)`,
        element: `color: ${color} on ${bg}`,
      });
    }
  });

  if (issues.length === 0) {
    issues.push({
      type: 'info',
      category: 'heading',
      message: 'No accessibility issues detected',
    });
  }

  return issues;
}
