# UC System AP Credit Implementation Summary 🎉

## What Was Added

### 1. **Complete UC AP Credit Data** (`data-uc.json`)
✅ All 37+ AP exams supported by UC system
✅ Quarter unit credits (as used by most UC campuses)
✅ Transfer requirement codes (UC-E, UC-M, UC-H, UC-B, UC-S)
✅ Special notes for credit caps and restrictions

### 2. **Key UC System Features**

#### Credit System
- **Quarter Units**: 8 units for most full exams (Biology, Chemistry, Physics 1/2, Calculus BC, etc.)
- **Half Units**: 4 units for smaller exams (Economics, Government, Environmental Science, etc.)
- **Minimum Score**: All exams require score of 3 (unlike UW's varying minimums)

#### Credit Maximums Implemented
- **English**: Max 8 quarter units for both Language & Literature combined
- **Calculus**: Max 8 quarter units for both AB & BC combined  
- **Physics**: Max 8 quarter units for all 4 Physics exams combined
- **Art & Design**: Max 8 quarter units for all 3 Art exams combined

#### Transfer Requirements
Color-coded badges show which requirement each exam satisfies:
- 🔵 **UC-E**: English (required for transfer)
- 🟢 **UC-M**: Mathematics (required for transfer)
- 🟣 **UC-H**: Humanities (4 courses from H/B/S required)
- 🟠 **UC-B**: Behavioral/Social Sciences (4 courses from H/B/S required)
- 🔴 **UC-S**: Sciences (4 courses from H/B/S required)

### 3. **UI/UX Enhancements**

#### School Switcher
- Tab navigation to switch between UW and UC
- Dynamic content updates (titles, disclaimers, notes)
- Separate data files loaded per school

#### UC-Specific Styling
```css
UC-E (English) → Blue badges
UC-M (Math) → Green badges
UC-H (Humanities) → Purple badges
UC-B (Social Sciences) → Orange badges
UC-S (Sciences) → Red badges
```

#### Comprehensive Notes Section
- Quarter vs. Semester unit explanation
- Credit cap warnings
- Transfer requirement guide with color legend
- Link to official UC admissions page

### 4. **Updated Documentation**

#### README.md
- Multi-school support explained
- UC system specific notes
- Data structure examples for both schools
- Official source links

## UC Exams Included

### Sciences (UC-S)
- Biology
- Chemistry  
- Environmental Science
- Physics 1, Physics 2
- Physics C: Mechanics
- Physics C: Electricity & Magnetism

### Mathematics (UC-M)
- Calculus AB
- Calculus BC (with AB subscore note)
- Statistics

### English (UC-E)
- English Language and Composition
- English Literature and Composition (UC-E/H)

### Humanities (UC-H)
- Art History
- Music Theory
- Chinese, French, German, Italian, Japanese, Latin, Spanish Language & Culture
- Spanish Literature and Culture

### Social Sciences (UC-B)
- Economics: Macro & Micro
- Government: US & Comparative
- Human Geography
- Psychology

### History (UC-B/H)
- United States History
- European History
- World History: Modern

### Other
- African American Studies
- Art & Design: 2-D, 3-D, Drawing
- Computer Science A
- Computer Science Principles

## Important UC Policies Noted

1. **No Precalculus Credit**: Exam offered 2024+ doesn't grant credit
2. **Music Theory Subscores**: No credit for subscores, only full exam
3. **English Transfer Restriction**: Only ONE English exam can meet transfer requirements
4. **Dual Requirements**: Some exams meet multiple requirements (e.g., UC-E/H) but can only satisfy ONE

## Technical Implementation

### Data Structure
```json
{
  "exam": "Biology",
  "minScore": 3,
  "courses": [{"code": "BIOLOGY", "name": "Biology (Elective)", "credits": 8}],
  "requirement": "UC-S",
  "note": "Optional special note"
}
```

### CSS Variables Used
- Maintained UW purple/gold theme for consistency
- Added specific colors for UC requirement badges
- Responsive design preserved

### JavaScript Logic
- School configuration object with data files and display text
- Dynamic UI updates on school switch
- Requirement badge rendering with data attributes for styling

## Testing Recommendations

1. ✅ Switch between UW and UC tabs
2. ✅ Verify autocomplete shows correct exams for each school
3. ✅ Check that UC shows all minimum scores as 3
4. ✅ Confirm requirement badges show correct colors
5. ✅ Test calculations with multiple exams
6. ✅ Verify notes section updates correctly

## Browser Compatibility

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsive design
- ✅ Uses standard ES6+ JavaScript
- ⚠️ May need HTTP server for `fetch()` to work (CORS restrictions with `file://`)

---

**Congratulations!** Your AP Credit Calculator now supports both UW Seattle and the entire UC system! 🎓✨
