/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


/*** 
   A pagination script with two functions:
   - showPage(list,page) for handling the paging logic
   - appendPageLinks(list) for dynamically adding page links with the necessary 'click' event logic
   - two global variables are declared:
     - 'students' is the collection of items to be paginated
     - 'studentsPerPage' is a constant, the 'maximum' no. of items to be displayed per page
***/

const students = document.getElementsByClassName('student-item');

const studentsPerPage = 10;

/*** 
   the showPage function:
   - takes a list of items, and a page number as arguments
   - based on the page number passed, picks the segment of the list by setting a start and end index
   - changes the CSS 'display' property to show all items on the given page and hides the rest
***/

const showPage = (list, page) => {

   // start index at 0 for page 1, 10 for page 2, and so on; end index at 9, 19, etc. correspondingly 
   const startIndex = ( page * studentsPerPage ) - studentsPerPage
   const endIndex = ( page * studentsPerPage ) - 1

   // iterate through list items and change 'CSS' to show or hide as per paging logic
   for (let i=0; i<list.length; i++){
      if (i >= startIndex && i <= endIndex){
         list[i].style.display = 'initial';
      } else {
         list[i].style.display = 'none';
      }
   }
}


/*** 
   the appendPageLinks function:
   - takes a list of items as an argument
   - calculates the no. of page links needed, generates them, and appends them
   - manages the functionality of the page links
     - on click calls the appropriate page to display
     - sets an 'active' class to that link (for CSS)
     - cleans up the CSS for previously-clicked links
***/

const appendPageLinks = (list) => {
   
   // calculating the no. of pages based on a given number items be displayed per page
   const pagesNeeded = Math.ceil(list.length / studentsPerPage);

   // creating a pagination 'div' and appending it to the '.page' div
   const pageDiv = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
   paginationDiv.className = 'pagination';
   pageDiv.appendChild(paginationDiv);
   
   // adding a 'ul' to the pagination 'div' to store the pagination links
   const paginationLinks = document.createElement('ul');
   paginationDiv.appendChild(paginationLinks);
   
   // for every page, adding a 'li' with a 'a' tag with the page no. as text
   for (let i=1; i<=pagesNeeded; i++){
      paginationLinks.innerHTML += `<li><a href="#">${i}</a></li>`;
   }
   
   // on click to the page 'a' tag, we call showPage(list, page) for the page we just clicked
   paginationLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A'){
         const link = e.target;
         const pageNumber = link.textContent;
         showPage(students, pageNumber);

         // removing 'active' class on previously-clicked pagination links
         const links = document.getElementsByTagName('A');
         for (let i=0; i<links.length; i++){
            links[i].className = '';
         }

         // adding an 'active' class to the link we just clicked
         link.className = 'active';
      }
   });

}

// initial state as page loads, first page shown.
showPage(students, 1);
appendPageLinks(students);