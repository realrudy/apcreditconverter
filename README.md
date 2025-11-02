# AP Credit Calculator - UW & UC Schools

A modern web app that calculates AP exam course credit equivalents for University of Washington (Seattle) and the University of California system, featuring school-specific branding, autocomplete exam selection, and transfer requirement tracking.

## Features

- **Multi-School Support** – Switch between UW Seattle and UC System with one click
- **Autocomplete Exam Selection** – Start typing an AP exam name and get instant suggestions with minimum score requirements
- **Dynamic Test Entry** – Add or remove as many AP exams as needed
- **Real-time Calculations** – Get instant results showing total credits and awarded courses
- **Transfer Requirements** – UC system displays color-coded transfer admission requirements (UC-E, UC-M, UC-H, UC-B, UC-S)
- **School-Specific Design** – UW-branded purple and gold color scheme with dynamic UI updates
- **Course Deduplication** – Automatically handles overlapping courses (keeps highest credit value)
- **Mobile Responsive** – Works on all screen sizes
- **Unit System Aware** – Displays quarter units for UC (with notes for Berkeley/Merced semester units)

## Supported Schools

### University of Washington, Seattle
- Full course equivalency mapping
- UW-specific general education requirements (VLPA, I&S, NW)
- Credits shown match UW's quarter system

### University of California System
- **Quarter Units** displayed for: Davis, Irvine, UCLA, Riverside, San Diego, Santa Barbara, Santa Cruz
- **Semester Units** for Berkeley and Merced (divide quarter units by 1.5)
- Transfer admission requirement codes:
  - 🔵 **UC-E** (English)
  - 🟢 **UC-M** (Mathematics)
  - 🟣 **UC-H** (Humanities)
  - 🟠 **UC-B** (Behavioral/Social Sciences)
  - 🔴 **UC-S** (Sciences)
- Credit maximums enforced (e.g., 8 units max for all Physics exams combined)

## Files

- `index.html` — Main UI with school tabs, test entry form, and results display
- `style.css` — School-themed styles with color-coded requirement badges
- `app.js` — School-switching logic, autocomplete, dynamic row management, and credit calculation
- `data-uw.json` — UW Seattle AP exam → course mappings
- `data-uc.json` — UC System AP exam → elective credit mappings with transfer requirements

## How to Run

### Option 1: Simple HTTP Server (Recommended)

```bash
cd /path/to/apcreditconverter
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

### Option 2: Direct File Opening

You can also open `index.html` directly in your browser, though some browsers may restrict `fetch()` for local files.

## How to Use

1. **Select your school** using the tabs at the top (UW Seattle or UC Schools)
2. **Type an exam name** in the text box – autocomplete will suggest matching AP exams
3. **Select from suggestions** by clicking
4. **Enter your score** (1-5) in the score field
5. **Add more tests** using the "+ Add Another Test" button
6. **Remove tests** using the ✕ button on any row
7. **Calculate** to see your total credits, course list, and transfer requirements

## UC System Important Notes

- **All exams require minimum score of 3** for UC credit
- **Scores below 3 do NOT negatively impact admission**
- Some exams have credit caps:
  - Max 8 quarter units for **both** English exams combined
  - Max 8 quarter units for **both** Calculus AB and BC combined
  - Max 8 quarter units for **all** Physics exams combined
  - Max 8 quarter units for **all three** Art & Design exams combined
- For **transfer students**: Only ONE English exam can meet transfer requirements
- Individual UC campuses may have additional policies - always verify!

## Editing Equivalencies

### UW Data (`data-uw.json`)
```json
{
  "exam": "Calculus BC",
  "minScore": 4,
  "courses": [
    {"code": "MATH 124", "name": "Calculus I", "credits": 5},
    {"code": "MATH 125", "name": "Calculus II", "credits": 5}
  ],
  "requirement": "NW"
}
```

### UC Data (`data-uc.json`)
```json
{
  "exam": "Calculus BC",
  "minScore": 3,
  "courses": [
    {"code": "CALC BC", "name": "Calculus BC (Elective)", "credits": 8}
  ],
  "requirement": "UC-M",
  "note": "Maximum 8 quarter units for both Calculus AB and BC combined."
}
```

**Important**: Always verify with official sources:
- [UW AP Equivalency Table](https://admit.washington.edu/apply/transfer/exams-for-credit/ap/)
- [UC AP Credit Guidelines](https://admission.universityofcalifornia.edu/admission-requirements/ap-exam-credits/)

## Design & Color Scheme

### UW Branding
- **UW Purple**: `#4b2e83` (primary brand color)
- **UW Gold**: `#b7a57a` (accent color)
- Gradients and variations for modern, accessible design

### UC Requirement Badge Colors
- **UC-E (English)**: Blue `#1976D2`
- **UC-M (Mathematics)**: Green `#388E3C`
- **UC-H (Humanities)**: Purple `#7B1FA2`
- **UC-B (Behavioral/Social Sciences)**: Orange `#F57C00`
- **UC-S (Sciences)**: Red `#C62828`

## Data Sources

All AP credit data has been sourced from official university websites:
- **UW Seattle**: [AP Exam Credits for Transfer](https://admit.washington.edu/apply/transfer/exams-for-credit/ap/)
- **UC System**: [AP Exam Credits](https://admission.universityofcalifornia.edu/admission-requirements/ap-exam-credits/)

Last updated: November 2025 for 2025-2026 academic year

## Future Enhancements

- Add more universities (e.g., CSU system, private universities)
- Export functionality (PDF/CSV)
- Local storage persistence (save your exam entries)
- Semester unit converter for Berkeley/Merced
- Credit cap warnings for UC system
- Sharing/printing features
- GitHub Pages deployment

## Credits

Unofficial tool created for educational purposes. Always verify credit equivalencies with official university registrar offices.

**Not affiliated with the University of Washington or the University of California system.**

## License

MIT License - Feel free to fork and adapt for other schools!
