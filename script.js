const choices = [...document.querySelectorAll('.choice-card')];
const projectType = document.querySelector('#project-type');
const projectTypeSelect = document.querySelector('#project-type-select');
const fileInput = document.querySelector('#reference-images');
const fileStatus = document.querySelector('#file-status');
const form = document.querySelector('#project-form');
const message = document.querySelector('#form-message');

function selectProject(value) {
  projectType.value = value;
  projectTypeSelect.value = value;
  choices.forEach((choice) => {
    const selected = choice.dataset.value === value;
    choice.classList.toggle('is-selected', selected);
    choice.setAttribute('aria-pressed', String(selected));
  });
}

choices.forEach((choice) => {
  choice.setAttribute('aria-pressed', String(choice.classList.contains('is-selected')));
  choice.addEventListener('click', () => selectProject(choice.dataset.value));
});

projectTypeSelect.addEventListener('change', () => selectProject(projectTypeSelect.value));

fileInput.addEventListener('change', () => {
  const count = fileInput.files.length;
  fileStatus.textContent = count ? `${count} image${count === 1 ? '' : 's'} selected for this browser session` : 'No images selected';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const requiredFields = [...form.querySelectorAll('[required]')];
  const missing = requiredFields.find((field) => !field.value.trim());
  if (missing) {
    message.textContent = 'Add the postcode, start timeframe and callback preference to preview the next step.';
    missing.focus();
    return;
  }
  message.textContent = 'This is a local-only concept preview. Your details and images have not been sent, stored or shared.';
});
