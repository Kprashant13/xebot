#!/usr/bin/env python3
"""
Xebot Component Update Script

Updates all HTML pages with the latest component content.
This ensures all pages stay in sync when you update header, footer, etc.

Usage:
    python update-components.py footer     # Update footer in all pages
    python update-components.py header     # Update header/navbar in all pages
    python update-components.py linkedin   # Update LinkedIn tag in all pages
    python update-components.py modal      # Update lead modal in all pages
    python update-components.py all        # Update all components

Components are stored in the /components/ directory.
"""

import os
import sys
import re

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
COMPONENTS_DIR = os.path.join(ROOT_DIR, 'components')

# All HTML pages to update
PAGES = [
    'index.html',
    'features.html',
    'pricing.html',
    'companies.html',
    'blog.html',
    'about.html',
    'careers.html',
    'contact.html',
    'practice.html',
    'privacy.html',
    'terms.html',
    'case-study-fintech.html',
    'case-study-ai-ml.html',
    'case-study-devtools.html',
    'blog/vibe-coding-interviews.html',
    'blog/why-vibe-coding-is-future.html',
    'blog/death-of-leetcode-interviews.html',
    'blog/ai-coding-interviews-guide.html',
    'blog/candidate-experience-matters.html',
    'blog/observability-new-must-have.html',
    'blog/problem-decomposition.html',
    'blog/evaluating-ai-collaboration.html',
    'blog/debugging-as-core-skill.html',
    'blog/prepare-for-ai-interviews.html',
]


def load_component(name):
    """Load a component file."""
    path = os.path.join(COMPONENTS_DIR, f'{name}.html')
    if os.path.exists(path):
        with open(path, 'r') as f:
            return f.read()
    return None


def update_header(content, page):
    """Update header/navbar section in HTML content."""
    # The logo SVG that should be consistent across all pages
    logo_svg = '''<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
                    <!-- X lines with glow effect -->
                    <path d="M9 9L23 23M23 9L9 23" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.3" filter="url(#glow)"/>
                    <path d="M9 9L23 23M23 9L9 23" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    <!-- Corner nodes -->
                    <circle cx="9" cy="9" r="2.5" fill="white"/>
                    <circle cx="23" cy="9" r="2.5" fill="white"/>
                    <circle cx="9" cy="23" r="2.5" fill="white"/>
                    <circle cx="23" cy="23" r="2.5" fill="white"/>
                    <!-- Center node -->
                    <circle cx="16" cy="16" r="3" fill="white"/>
                    <circle cx="16" cy="16" r="1.5" fill="url(#gradient)"/>
                    <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
                            <stop stop-color="#6366f1"/>
                            <stop offset="1" stop-color="#a855f7"/>
                        </linearGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="blur"/>
                            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                        </filter>
                    </defs>
                </svg>'''

    # Pattern to find and replace the logo SVG in navbar-brand
    # This matches the SVG inside the navbar-brand link
    pattern = r'(<a href="/" class="navbar-brand">\s*)<svg[^>]*>[\s\S]*?</svg>'
    replacement = r'\1' + logo_svg

    if re.search(pattern, content):
        return re.sub(pattern, replacement, content)
    return content


def update_footer(content):
    """Update footer section in HTML content."""
    footer_html = load_component('footer')
    if not footer_html:
        print("Warning: footer.html not found")
        return content

    # Pattern to find footer section
    # Matches from <!-- Footer --> or <footer class="footer"> to </footer>
    pattern = r'(    )?<!-- Footer -->[\s\S]*?</footer>|(    )?<footer class="footer">[\s\S]*?</footer>'

    if re.search(pattern, content):
        return re.sub(pattern, footer_html.strip(), content)
    return content


def update_linkedin_tag(content):
    """Update LinkedIn tag section in HTML content."""
    linkedin_html = """    <!-- LinkedIn Tag Manager -->
    <script type="text/javascript">
    _linkedin_partner_id = "8577212";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    </script>
    <script type="text/javascript">
    (function(l) {
    if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
    window.lintrk.q=[]}
    var s = document.getElementsByTagName("script")[0];
    var b = document.createElement("script");
    b.type = "text/javascript";b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b, s);})(window.lintrk);
    </script>
    <noscript>
    <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=8577212&fmt=gif" />
    </noscript>"""

    # Pattern to find LinkedIn tag section
    pattern = r'(    )?<!-- LinkedIn Tag Manager -->[\s\S]*?</noscript>'

    if re.search(pattern, content):
        return re.sub(pattern, linkedin_html.strip(), content)
    return content


def update_lead_modal(content):
    """Update lead modal section in HTML content."""
    modal_html = load_component('lead-modal')
    if not modal_html:
        print("Warning: lead-modal.html not found")
        return content

    # Pattern to find lead modal section (includes success modal)
    pattern = r'(    )?<!-- Lead Capture Modal -->[\s\S]*?</div>\s*</div>\s*</div>\s*<!-- Success Modal -->[\s\S]*?</div>\s*</div>\s*</div>'

    if re.search(pattern, content):
        return re.sub(pattern, modal_html.strip(), content)
    return content


def update_page(page, components):
    """Update a single page with specified components."""
    path = os.path.join(ROOT_DIR, page)

    if not os.path.exists(path):
        print(f"Warning: {page} not found")
        return False

    with open(path, 'r') as f:
        content = f.read()

    original = content

    if 'header' in components or 'all' in components:
        content = update_header(content, page)

    if 'footer' in components or 'all' in components:
        content = update_footer(content)

    if 'linkedin' in components or 'all' in components:
        content = update_linkedin_tag(content)

    if 'modal' in components or 'all' in components:
        content = update_lead_modal(content)

    if content != original:
        with open(path, 'w') as f:
            f.write(content)
        return True

    return False


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    components = sys.argv[1:]

    valid_components = ['header', 'footer', 'linkedin', 'modal', 'all']
    for c in components:
        if c not in valid_components:
            print(f"Unknown component: {c}")
            print(f"Valid components: {', '.join(valid_components)}")
            sys.exit(1)

    print(f"Updating components: {', '.join(components)}")
    print()

    updated = 0
    for page in PAGES:
        if update_page(page, components):
            print(f"Updated: {page}")
            updated += 1
        else:
            print(f"No changes: {page}")

    print()
    print(f"Done! Updated {updated} of {len(PAGES)} pages.")


if __name__ == '__main__':
    main()
