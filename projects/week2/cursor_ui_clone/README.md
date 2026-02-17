# Cursor-landing-ui

Desktop-first UI recreation of a modern developer-tool Cursor's landing page, built for frontend practice and layout exploration

---
### Live link : https://cursor-landing-ui.vercel.app/

## Screenshot

![Full screen image](assets/cursor-landing-ui.vercel.app_.png)
=======
## Sections

### 1. Top Navigation Bar
- Logo, nav links, primary CTA  
- Dark background  

### 2. Hero Section
- Main headline, description, CTA  
- Large product screenshot  

### 3. Trusted By / Logos
- Row of company logos  

### 4. Feature Sections (3 blocks)
- Two-column layout (text + image)  
- Alternate image/text positions  

### 5. Feature Cards Section
- Section title  
- Grid of 3–4 cards  

### 6. Testimonials
- Quote cards with name and role  

### 7. Use Cases / Stories
- Cards with image + short text  

### 8. Changelog / Updates
- List of updates with date  

### 9. Team / About
- Large image + short description + CTA  

### 10. Final CTA
- Big heading + single button  

### 11. Footer
- Multi-column links and company info  


# Project Styling & Design System

This project uses a **dark, editorial UI theme** with muted neutrals, soft contrasts, and a custom gothic-style typeface. The design focuses on clarity, hierarchy, and a modern product aesthetic.

---

## Typography

### Primary Font

**CursorGothic**  
A custom gothic-style font used across the entire application.

```css
font-family: CursorGothic, "CursorGothic Fallback", system-ui,
             "Helvetica Neue", Helvetica, Arial, sans-serif;

Font Weights & Styles
Weight	Style	Usage
400	Normal	Body text, navigation, paragraphs
400	Italic	Emphasis text
700	Bold	Headings, CTAs
700	Italic	Highlighted emphasis
```

### Font Loading

- Self-hosted via @font-face

- Uses .woff2 for performance

- font-display: swap for better UX


## 🎨 Colors Used

### CSS Variables
```css
Variable	        Value
--color-theme-bg	#14120b
--color-theme-fg	#edecec
--color-theme-fg-02	#d7d6d5
--color-theme-card-hex	#1b1913
--color-theme-card-01-hex	#1d1b15
--color-theme-card-02-hex	#201e18
--color-theme-card-03-hex	#26241e
--color-theme-card-04-hex	#2b2923
```
### 🛠 Notes

- All fonts are self-hosted using `@font-face`
- Colors are used directly or via CSS variables
- No external font or color libraries are used

### Copyright

This project is just for educational purposes.
