let participantCount = 1;

function participantTemplate(count){
    return `
    <section class="participant" id="participant-section-${count}">
      <p class="participant-header">Participant ${count}</p>
      <div class="item">
        <label for="fname-${count}">First Name<span class="required">*</span></label>
        <input id="fname-${count}" type="text" name="fname-${count}" value="" required />
      </div>
      <div class="item activities">
        <label for="activity-${count}">Activity #<span class="required">*</span></label>
        <input id="activity-${count}" type="text" name="activity-${count}" />
      </div>
      <div class="item">
        <label for="fee-${count}">Fee ($)<span class="required">*</span></label>
        <input id="fee-${count}" type="number" name="fee-${count}" />
      </div>
      <div class="item">
        <label for="date-${count}">Desired Date <span class="required">*</span></label>
        <input id="date-${count}" type="date" name="date-${count}" />
      </div>
      <div class="item">
        <p>Grade</p>
        <select id="grade-${count}" name="grade-${count}">
          <!-- Corrected: Removed redundant 'selected' when 'disabled' is present -->
          <option value="" disabled selected></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>
  `;
}

function totalFees(){
    let feeElements = document.querySelectorAll("[id^=fee]");
    console.log("Fee Elements Found:", feeElements);
    feeElements = [...feeElements];
    const total = feeElements.reduce((accumulator, currentInput) =>{
        return accumulator + (parseFloat(currentInput.value) || 0);
    }, 0);
    return total;
}

document.addEventListener('DOMContentLoaded', () => {
//Add Participant Button
    const addParticipantButton = document.getElementById('add');
    if (addParticipantButton) {
        addParticipantButton.addEventListener('click', () => {
            participantCount++;
        const newParticipantHtml = participantTemplate(participantCount);
        addParticipantButton.insertAdjacentHTML('beforebegin', newParticipantHtml);
        });
  }

//Submit Form Button
    const registrationForm = document.querySelector('form');
    const summarySection = document.getElementById('summary');

  if (registrationForm && summarySection) {
    registrationForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent page reload

      const totalFee = totalFees();
      const adultNameInput = document.getElementById('adult_name');
      const adultName = adultNameInput ? adultNameInput.value : '';

      registrationForm.style.display = 'none'; // Hide the form
      summarySection.style.display = 'block'; // Show the summary

      const message = `
        <p>Thank you <strong>${adultName}</strong> for registering.</p>
        <p>You have registered <strong>${participantCount}</strong> participants and owe <strong>$${totalFee.toFixed(2)}</strong> in Fees.</p>
      `;
      summarySection.innerHTML = message;
    });
  }
});