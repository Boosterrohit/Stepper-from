function next(currentStep, nextStep) {
  // Validate the current step
  if (!validateStep(currentStep)) {
    return;
  }

  // Hide current step
  document.getElementById(`step${currentStep}form`).classList.remove("active");

  // Show next step
  document.getElementById(`step${nextStep}form`).classList.add("active");

  // Update stepper
  document.getElementById(`step${currentStep}`).classList.remove("active");
  document.getElementById(`step${nextStep}`).classList.add("active");
}

// Add validation function
function validateStep(step) {
  const stepForm = document.getElementById(`step${step}form`);
  const inputs = stepForm.querySelectorAll("input, select");

  for (let input of inputs) {
    if (input.hasAttribute("required") && !input.value) {
      alert(`Please fill out the required field.`);
      return false;
    }
  }
  return true;
}

// Previous Button functionality
function previous(currentStep, previousStep) {
  // Hide current step
  document.getElementById(`step${currentStep}form`).classList.remove("active");

  // Show previous step
  document.getElementById(`step${previousStep}form`).classList.add("active");

  // Update stepper
  document.getElementById(`step${currentStep}`).classList.remove("active");
  document.getElementById(`step${previousStep}`).classList.add("active");
}

// hiding all step expcept first stepper
document.addEventListener("DOMContentLoaded", function () {
  const step = document.querySelectorAll(".form-step");
  step.forEach((step, index) => {
    if (index !== 0) {
      step.classList.remove("active");
    }
  });
});

// Preview image for profile
function showImagePreview(event) {
  input = event.target;
  const preview = document.getElementById("image-preview");

  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    preview.src = "";
    preview.style.display = "none";
  }
}

function submitForm() {
  const form = document.getElementById("stepper-form");
  const formData = new FormData(form);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Store the data in localStorage
  localStorage.setItem("formData", JSON.stringify(data));

  // Handle image upload and storage
  const file = formData.get("media");
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      localStorage.setItem("formImage", e.target.result);
      window.location.href = "profileInfo.html"; // Redirect to the new page
    };
    reader.readAsDataURL(file);
  } else {
    window.location.href = "profileInfo.html"; // Redirect to the new page
  }
}
