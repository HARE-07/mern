document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const courseSelect = document.getElementById('course');
    const semesterSelect = document.getElementById('semester');
    const subjectInputsDiv = document.getElementById('subjectInputs');
    const generateBtn = document.getElementById('generateBtn');
    const marksheet = document.getElementById('marksheet');
    const printBtn = document.getElementById('printBtn');
    const newBtn = document.getElementById('newBtn');
    
    // Course subjects data
    const courseSubjects = {
        bsc: [
            { name: "Programming Fundamentals", maxMarks: 100 },
            { name: "Discrete Mathematics", maxMarks: 100 },
            { name: "Computer Organization", maxMarks: 100 },
            { name: "Operating Systems", maxMarks: 100 },
            { name: "Database Management", maxMarks: 100 }
        ],
        bca: [
            { name: "C Programming", maxMarks: 100 },
            { name: "Digital Electronics", maxMarks: 100 },
            { name: "Business Systems", maxMarks: 100 },
            { name: "Web Development", maxMarks: 100 },
            { name: "Mathematics", maxMarks: 100 }
        ],
        btech: [
            { name: "Data Structures", maxMarks: 100 },
            { name: "Algorithms", maxMarks: 100 },
            { name: "Computer Networks", maxMarks: 100 },
            { name: "Software Engineering", maxMarks: 100 },
            { name: "Artificial Intelligence", maxMarks: 100 }
        ],
        mba: [
            { name: "Business Management", maxMarks: 100 },
            { name: "Financial Accounting", maxMarks: 100 },
            { name: "Marketing Principles", maxMarks: 100 },
            { name: "Organizational Behavior", maxMarks: 100 },
            { name: "Business Statistics", maxMarks: 100 }
        ],
        MCA: [
            { name: "OPERATING SYSTEM", maxMarks: 100 },
            { name: "DSA", maxMarks: 100 },
            { name: "WEB TECH", maxMarks: 100 },
            { name: "DBMS", maxMarks: 100 },
            { name: "JAVA", maxMarks: 100 }
        ]
    };
    
    // Course full names for display
    const courseFullNames = {
        bsc: "B.Sc Computer Science",
        bca: "Bachelor of Computer Applications (BCA)",
        btech: "B.Tech Computer Science",
        mba: "Master of Business Administration (MBA)",
        MCA: "MASTER OF COMPUTER (MCA)"
    };
    
    // Event Listeners
    courseSelect.addEventListener('change', updateSubjectInputs);
    generateBtn.addEventListener('click', generateMarksheet);
    printBtn.addEventListener('click', printMarksheet);
    newBtn.addEventListener('click', resetForm);
    
    // Update subject inputs based on selected course
    function updateSubjectInputs() {
        const course = courseSelect.value;
        subjectInputsDiv.innerHTML = '';
        
        if (course && courseSubjects[course]) {
            courseSubjects[course].forEach((subject, index) => {
                const subjectDiv = document.createElement('div');
                subjectDiv.className = 'subject-input';
                
                const label = document.createElement('label');
                label.textContent = subject.name;
                label.htmlFor = `subject${index}`;
                
                const input = document.createElement('input');
                input.type = 'number';
                input.id = `subject${index}`;
                input.min = '0';
                input.max = subject.maxMarks;
                input.placeholder = `Max ${subject.maxMarks}`;
                input.required = true;
                
                subjectDiv.appendChild(label);
                subjectDiv.appendChild(input);
                subjectInputsDiv.appendChild(subjectDiv);
            });
        }
    }
    
    // Generate mark sheet
    function generateMarksheet() {
        // Validate form
        if (!validateForm()) return;
        
        // Get form values
        const studentName = document.getElementById('studentName').value;
        const rollNumber = document.getElementById('rollNumber').value;
        const course = courseSelect.value;
        const semester = semesterSelect.value;
        
        // Update mark sheet header
        document.getElementById('displayName').textContent = studentName;
        document.getElementById('displayRoll').textContent = rollNumber;
        document.getElementById('courseTitle').textContent = 
            `${courseFullNames[course]} - Semester ${semester}`;
        
        // Process marks
        const subjects = courseSubjects[course];
        const marksTableBody = document.getElementById('marksTableBody');
        marksTableBody.innerHTML = '';
        
        let totalMaxMarks = 0;
        let totalObtainedMarks = 0;
        
        subjects.forEach((subject, index) => {
            const marksObtained = parseInt(document.getElementById(`subject${index}`).value);
            
            // Calculate grade
            const percentage = (marksObtained / subject.maxMarks) * 100;
            const grade = calculateGrade(percentage);
            
            // Add to totals
            totalMaxMarks += subject.maxMarks;
            totalObtainedMarks += marksObtained;
            
            // Create table row
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${subject.name}</td>
                <td>${subject.maxMarks}</td>
                <td>${marksObtained}</td>
                <td>${grade}</td>
            `;
            marksTableBody.appendChild(row);
        });
        
        // Calculate overall results
        const totalPercentage = (totalObtainedMarks / totalMaxMarks) * 100;
        const overallGrade = calculateGrade(totalPercentage);
        const division = calculateDivision(totalPercentage);
        
        // Update totals
        document.getElementById('totalMaxMarks').textContent = totalMaxMarks;
        document.getElementById('totalObtainedMarks').textContent = totalObtainedMarks;
        document.getElementById('overallGrade').textContent = overallGrade;
        document.getElementById('divisionResult').textContent = `Division: ${division}`;
        
        // Set remarks
        const remarksText = getRemarks(totalPercentage);
        document.getElementById('remarksText').textContent = remarksText;
        
        // Show mark sheet
        marksheet.classList.remove('hidden');
        
        // Scroll to mark sheet
        marksheet.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Validate form
    function validateForm() {
        const studentName = document.getElementById('studentName').value.trim();
        const rollNumber = document.getElementById('rollNumber').value.trim();
        const course = courseSelect.value;
        const semester = semesterSelect.value;
        
        if (!studentName) {
            alert('Please enter student name');
            return false;
        }
        
        if (!rollNumber) {
            alert('Please enter roll number');
            return false;
        }
        
        if (!course) {
            alert('Please select a course');
            return false;
        }
        
        if (!semester) {
            alert('Please select a semester');
            return false;
        }
        
        // Validate subject marks
        const subjects = courseSubjects[course];
        for (let i = 0; i < subjects.length; i++) {
            const input = document.getElementById(`subject${i}`);
            if (!input.value) {
                alert(`Please enter marks for ${subjects[i].name}`);
                return false;
            }
            
            const marks = parseInt(input.value);
            if (isNaN(marks) || marks < 0 || marks > subjects[i].maxMarks) {
                alert(`Marks for ${subjects[i].name} must be between 0 and ${subjects[i].maxMarks}`);
                return false;
            }
        }
        
        return true;
    }
    
    // Calculate grade based on percentage
    function calculateGrade(percentage) {
        if (percentage >= 90) return 'A+';
        if (percentage >= 80) return 'A';
        if (percentage >= 70) return 'B+';
        if (percentage >= 60) return 'B';
        if (percentage >= 50) return 'C';
        if (percentage >= 40) return 'D';
        return 'F';
    }
    
    // Calculate division based on percentage
    function calculateDivision(percentage) {
        if (percentage >= 75) return 'First Class with Distinction';
        if (percentage >= 60) return 'First Class';
        if (percentage >= 50) return 'Second Class';
        if (percentage >= 40) return 'Third Class';
        return 'Fail';
    }
    
    // Get remarks based on percentage
    function getRemarks(percentage) {
        if (percentage >= 90) return 'Outstanding Performance!';
        if (percentage >= 75) return 'Excellent Performance! Keep it up.';
        if (percentage >= 60) return 'Good Performance. You can do better.';
        if (percentage >= 50) return 'Average Performance. Needs improvement.';
        if (percentage >= 40) return 'Below Average. Work harder.';
        return 'Failed. Please try again.';
    }
    
    // Print mark sheet
    function printMarksheet() {
        window.print();
    }
    
    // Reset form
    function resetForm() {
        document.getElementById('studentName').value = '';
        document.getElementById('rollNumber').value = '';
        courseSelect.value = '';
        semesterSelect.value = '';
        subjectInputsDiv.innerHTML = '';
        marksheet.classList.add('hidden');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});