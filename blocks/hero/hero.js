export default function decorate(block) {
    // Fetch dropdown data and create form
    async function fetchDropdownData() {
        try {
            // Fetch the JSON response
            const response = await fetch('https://dummyjson.com/todos');
            const data = await response.json();
            
            // Extract area of study and class preference data from the fetched todos (simulate)
            const areaOfStudyData = data.todos.map(todo => ({
                value: todo.id,
                label: todo.todo
            }));
 
            const classPreferenceData = [
                { value: 'online', label: 'Online' },
                { value: 'onsite', label: 'On Campus' }
            ]; // Example hardcoded options for class preference
            
            // Call createForm to create and insert the form
            createForm(areaOfStudyData, classPreferenceData);
        } catch (error) {
            console.error('Error fetching dropdown data:', error);
        }
    }
 
    // Create the form dynamically using JS
    function createForm(areaOfStudyOptions, classPreferenceOptions) {
        const formContainer = document.createElement('div');
        formContainer.className = 'form-container';
        
        const formTitle = document.createElement('h2');
        formTitle.textContent = 'Select Your Preferences';
        formContainer.appendChild(formTitle);
 
        // Create the form element
        const form = document.createElement('form');
        form.id = 'dynamicForm';
 
        // Create the first dropdown (Area of Study)
        const label1 = document.createElement('label');
        label1.setAttribute('for', 'dropdown1');
        label1.textContent = 'Select Area of Study:';
        form.appendChild(label1);
 
        const dropdown1 = document.createElement('select');
        dropdown1.id = 'dropdown1';
        populateDropdown(dropdown1, areaOfStudyOptions);
        form.appendChild(dropdown1);
 
        // Create the second dropdown (Class Preference)
        const label2 = document.createElement('label');
        label2.setAttribute('for', 'dropdown2');
        label2.textContent = 'Select Class Preference:';
        form.appendChild(label2);
 
        const dropdown2 = document.createElement('select');
        dropdown2.id = 'dropdown2';
        populateDropdown(dropdown2, classPreferenceOptions);
        form.appendChild(dropdown2);
 
        // Create the Submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        form.appendChild(submitButton);
 
        formContainer.appendChild(form);
        
        // Append formContainer to block here
        block.appendChild(formContainer);
 
        // Add form submission handler
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const areaOfStudy = dropdown1.value;
            const classPreference = dropdown2.value;
            alert(`Area of Study: ${areaOfStudy}\nClass Preference: ${classPreference}`);
        });
    }
 
    // Populate dropdown options
    function populateDropdown(dropdown, data) {
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.value;
            option.textContent = item.label;
            dropdown.appendChild(option);
        });
    }
 
    // Fetch data and create the form inside the block
    fetchDropdownData();
}
