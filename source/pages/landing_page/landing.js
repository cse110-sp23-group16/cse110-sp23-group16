// Constant to avoid typos
const QuestionCategories = {
  Work: 'Work',
  Social: 'Social',
  Family: 'Family',
  Love: 'Love',
}

// store question and category to localStorage then route to skymap page
function handleOnClick() {
  localStorage.setItem("questionInput", document.getElementById("input-text").value);
  localStorage.setItem("questionCategory", getCategory());

  window.location.href = "../skymap_page/skymap.html";
}

function getCategory() {
  return QuestionCategories.Work;
}