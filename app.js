// AP credit calculator with autocomplete for UW and UC schools
let mapping = [];
let testRowCounter = 0;
let currentSchool = 'uw'; // 'uw' or 'uc'

const schoolConfig = {
  uw: {
    dataFile: 'data-uw.json',
    title: 'University of Washington, Seattle',
    disclaimer: 'Note: I am not affiliated with the University of Washington. All data has been sourced from the <a href="https://admit.washington.edu/apply/transfer/exams-for-credit/ap/" target="_blank">University of Washington</a> page for AP exams.',
    resultsTitle: 'Your UW Course Credits',
    notes: [
      'This calculator is unofficial, although it has accurate information for the 2025-2026 application season. Always verify with the <a href="https://admit.washington.edu/apply/transfer/exams-for-credit/ap/" target="_blank">official UW AP equivalency table</a>.',
      'If multiple AP exams grant the same course, only the highest credit value is counted (no duplicates).',
      'Minimum scores are shown in parentheses for each exam.'
    ]
  },
  uc: {
    dataFile: 'data-uc.json',
    title: 'University of California System',
    disclaimer: 'Note: I am not affiliated with the University of California. All data has been sourced from the <a href="https://admission.universityofcalifornia.edu/admission-requirements/ap-exam-credits/" target="_blank">UC Admissions</a> page for AP exams. Credits shown are in <strong>quarter units</strong> (used by most UC campuses). Berkeley and Merced use semester units - divide by 1.5 to convert.',
    resultsTitle: 'Your UC Course Credits (Quarter Units)',
    notes: [
      'This calculator is unofficial but uses current UC system guidelines for the 2025-2026 season. Always verify with the <a href="https://admission.universityofcalifornia.edu/admission-requirements/ap-exam-credits/" target="_blank">official UC AP credit page</a> and your specific campus.',
      '<strong>Units shown are QUARTER UNITS</strong> (for Davis, Irvine, UCLA, Riverside, San Diego, Santa Barbara, Santa Cruz). Berkeley and Merced use semester units (divide by 1.5).',
      'All AP exams require a minimum score of 3 for UC credit. Scores below 3 do not affect admission chances.',
      'Some exams have credit caps (e.g., max 8 units for all Physics exams, max 8 units for both English exams, max 8 units for both Calculus exams).',
      '<strong>Transfer Admission Requirements Key:</strong> <span style="background:#1976D2;color:white;padding:2px 6px;border-radius:3px;font-size:0.85em;">UC-E</span> English • <span style="background:#388E3C;color:white;padding:2px 6px;border-radius:3px;font-size:0.85em;">UC-M</span> Math • <span style="background:#7B1FA2;color:white;padding:2px 6px;border-radius:3px;font-size:0.85em;">UC-H</span> Humanities • <span style="background:#F57C00;color:white;padding:2px 6px;border-radius:3px;font-size:0.85em;">UC-B</span> Behavioral/Social Sciences • <span style="background:#C62828;color:white;padding:2px 6px;border-radius:3px;font-size:0.85em;">UC-S</span> Sciences',
      'For transfer students: Only ONE English exam can satisfy transfer requirements, even if you take both. An exam with multiple designations (e.g., UC-E/H) can only meet one requirement.'
    ]
  }
};

async function loadData(school = 'uw'){
  try{
    currentSchool = school;
    const res = await fetch(schoolConfig[school].dataFile);
    mapping = await res.json();
    updateUI();
    init();
  }catch(err){
    document.getElementById('test-entries').innerText = `Failed to load ${schoolConfig[school].dataFile}: ` + err;
  }
}

function updateUI(){
  const config = schoolConfig[currentSchool];
  document.getElementById('subtitle-text').textContent = config.title;
  document.getElementById('disclaimer-text').innerHTML = config.disclaimer;
  document.getElementById('results-title').textContent = config.resultsTitle;
  
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = '';
  config.notes.forEach(note => {
    const li = document.createElement('li');
    li.innerHTML = note;
    notesList.appendChild(li);
  });
}

function init(){
  // Clear existing entries
  document.getElementById('test-entries').innerHTML = '';
  testRowCounter = 0;
  
  // Hide results section
  document.getElementById('results-section').style.display = 'none';
  
  // Add initial test row
  addTestRow();
  
  // Wire buttons (remove old listeners by replacing buttons)
  const addBtn = document.getElementById('add-test');
  const calcBtn = document.getElementById('calculate');
  
  addBtn.replaceWith(addBtn.cloneNode(true));
  calcBtn.replaceWith(calcBtn.cloneNode(true));
  
  document.getElementById('add-test').addEventListener('click', addTestRow);
  document.getElementById('calculate').addEventListener('click', calculate);
}

function switchSchool(school){
  loadData(school);
  
  // Apply theme class to body
  document.body.className = `theme-${school}`;
}

function addTestRow(){
  const container = document.getElementById('test-entries');
  const row = document.createElement('div');
  row.className = 'test-row';
  row.dataset.id = testRowCounter++;

  const examWrapper = document.createElement('div');
  examWrapper.className = 'input-group';
  const examLabel = document.createElement('label');
  examLabel.textContent = 'AP Exam';
  const examInput = document.createElement('input');
  examInput.type = 'text';
  examInput.className = 'exam-input';
  examInput.placeholder = 'Start typing exam name...';
  examInput.autocomplete = 'off';
  
  const suggestionBox = document.createElement('div');
  suggestionBox.className = 'suggestions';
  
  examWrapper.appendChild(examLabel);
  examWrapper.appendChild(examInput);
  examWrapper.appendChild(suggestionBox);

  const scoreWrapper = document.createElement('div');
  scoreWrapper.className = 'input-group';
  const scoreLabel = document.createElement('label');
  scoreLabel.textContent = 'Score (1-5)';
  const scoreInput = document.createElement('input');
  scoreInput.type = 'number';
  scoreInput.className = 'score-input';
  scoreInput.min = 1;
  scoreInput.max = 5;
  scoreInput.placeholder = '1-5';
  
  scoreWrapper.appendChild(scoreLabel);
  scoreWrapper.appendChild(scoreInput);

  const removeBtn = document.createElement('button');
  removeBtn.className = 'btn-remove';
  removeBtn.innerHTML = '✕';
  removeBtn.title = 'Remove this test';
  removeBtn.addEventListener('click', () => {
    row.remove();
    // Keep at least one row
    if(document.querySelectorAll('.test-row').length === 0) addTestRow();
  });

  row.appendChild(examWrapper);
  row.appendChild(scoreWrapper);
  row.appendChild(removeBtn);
  container.appendChild(row);

  // Wire autocomplete
  wireAutocomplete(examInput, suggestionBox);
}

function wireAutocomplete(input, suggestionBox){
  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    suggestionBox.innerHTML = '';
    
    if(query.length === 0){
      suggestionBox.style.display = 'none';
      return;
    }

    // Get unique exam names that match the query
    const uniqueExams = new Map();
    mapping.forEach(m => {
      if(m.exam.toLowerCase().includes(query)){
        if(!uniqueExams.has(m.exam)){
          // Find min and max scores for this exam
          const allScores = mapping.filter(x => x.exam === m.exam).map(x => x.minScore);
          const minScore = Math.min(...allScores);
          uniqueExams.set(m.exam, {exam: m.exam, minScore});
        }
      }
    });
    
    if(uniqueExams.size === 0){
      suggestionBox.style.display = 'none';
      return;
    }

    Array.from(uniqueExams.values()).forEach(m => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.textContent = `${m.exam} (min score: ${m.minScore})`;
      item.addEventListener('click', () => {
        input.value = m.exam;
        input.dataset.examName = m.exam;
        suggestionBox.innerHTML = '';
        suggestionBox.style.display = 'none';
      });
      suggestionBox.appendChild(item);
    });

    suggestionBox.style.display = 'block';
  });

  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if(!input.contains(e.target) && !suggestionBox.contains(e.target)){
      suggestionBox.style.display = 'none';
    }
  });
}

function calculate(){
  const rows = document.querySelectorAll('.test-row');
  const results = {}; // keyed by course code
  const usedSources = {}; // map course->source string

  rows.forEach(row => {
    const examInput = row.querySelector('.exam-input');
    const scoreInput = row.querySelector('.score-input');
    
    const examName = examInput.value.trim();
    const score = parseInt(scoreInput.value, 10);
    
    if(!examName || Number.isNaN(score)) return;

    // Find all matching exams in mapping (case-insensitive) and get the best match for the score
    const matchingExams = mapping.filter(m => m.exam.toLowerCase() === examName.toLowerCase());
    if(matchingExams.length === 0) return;

    // Find the exam entry with the highest minScore that the user's score meets or exceeds
    let examData = null;
    for(let i = matchingExams.length - 1; i >= 0; i--){
      if(score >= matchingExams[i].minScore){
        examData = matchingExams[i];
        break;
      }
    }

    if(!examData) return; // Score too low for any credit

    // Add courses from this exam
    examData.courses.forEach(c => {
      const key = c.code;
      // Keep highest credit value if duplicate course
      if(!results[key] || c.credits > results[key].credits){
        results[key] = {
          code: c.code, 
          name: c.name, 
          credits: c.credits,
          requirement: examData.requirement || ''
        };
        usedSources[key] = `${examData.exam} (score: ${score})`;
      }
    });
  });

  // Render results
  const tbody = document.querySelector('#courses-table tbody');
  tbody.innerHTML = '';
  let total = 0;
  const courseList = Object.values(results).sort((a,b) => b.credits - a.credits || a.code.localeCompare(b.code));
  
  courseList.forEach(c => {
    total += c.credits;
    const tr = document.createElement('tr');
    
    const tdCode = document.createElement('td');
    tdCode.textContent = c.code;
    if(c.requirement){
      const badge = document.createElement('span');
      badge.className = 'requirement-badge';
      badge.setAttribute('data-requirement', c.requirement);
      badge.textContent = c.requirement;
      tdCode.appendChild(document.createElement('br'));
      tdCode.appendChild(badge);
    }
    tr.appendChild(tdCode);
    
    const tdName = document.createElement('td');
    tdName.textContent = c.name;
    tr.appendChild(tdName);
    
    const tdCredits = document.createElement('td');
    tdCredits.textContent = c.credits;
    tr.appendChild(tdCredits);
    
    const tdSource = document.createElement('td');
    tdSource.textContent = usedSources[c.code] || '-';
    tr.appendChild(tdSource);
    
    tbody.appendChild(tr);
  });

  const summary = document.getElementById('summary');
  const resultsSection = document.getElementById('results-section');
  
  if(courseList.length === 0){
    summary.innerHTML = '<p class="no-results">No credits found. Make sure exam names match exactly and scores meet minimum requirements.</p>';
    resultsSection.style.display = 'block';
  } else {
    summary.innerHTML = `
      <div class="total-credits">
        <span class="label">Total Credits Earned:</span>
        <span class="value">${total}</span>
      </div>
      <div class="course-count">
        <span class="label">Courses Awarded:</span>
        <span class="value">${courseList.length}</span>
      </div>
    `;
    resultsSection.style.display = 'block';
  }

  // Smooth scroll to results
  resultsSection.scrollIntoView({behavior: 'smooth', block: 'start'});
}

// Init on page load
window.addEventListener('DOMContentLoaded', () => {
  // Set initial theme
  document.body.className = 'theme-uw';
  
  loadData('uw');
  
  // Wire tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active tab
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      // Load data for selected school
      const school = e.target.dataset.school;
      switchSchool(school);
    });
  });
});
