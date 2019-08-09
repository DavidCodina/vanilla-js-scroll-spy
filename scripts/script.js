const sections  = document.getElementsByClassName("section");
const nav_links = document.getElementsByClassName("nav-link");


/* =============================================================================
                            section_is_below_scroll()
============================================================================= */


//This function checks if an element is below scroll
function section_is_below_scroll(element) {
  const position = element.getBoundingClientRect();
	const offset   = 100; //A gap between top of window and element.
	const result   = (position.top - offset) > 0;
  return result;
}


/* =============================================================================
                            select_link()
============================================================================= */


function select_link(id = null) {
  Array.prototype.forEach.call(nav_links, (nav_link) => {
    nav_link.classList.remove('is-selected');
  });

	if (id){
		document.querySelector('a[href="#' + id + '"]').classList.add('is-selected');
	}
}


/* =============================================================================
                             get_current_section()
============================================================================= */


function get_current_section() {
  const number_of_sections = sections.length;
	let index;
	let section;

	//index begins at 0.
	//while index is less than the number of sections, run this code.
  for (index = 0; index < number_of_sections; index++) {

		////////////////////////////////////////////////////////////////////////////
		//
		//The item() method returns a node at the specified index in a NodeList object.
		//The nodes are sorted as they appear in the source code, and the index starts at 0.
		//A Node object's collection of child nodes is an example of a NodeList object.
		//Note: There are two ways to access a node at the specified index in a node list:
		//section = sections.item(index);
		section = sections[index];

		//Get the first (next) section that is below the scroll.
    if ( section_is_below_scroll(section) ){
			break;
		}
  }

	//////////////////////////////////////////////////////////////////////////////
	//
	//	If the first section below the scroll is #section1, then call select_link() with
	//	no argument. This will make select_link use the default value of null.
	//	In such cases, .is-selected is removed from ALL elements with a class of .nav-link.
	//	However, .is-selected is NOT reapplied.
	//
	//////////////////////////////////////////////////////////////////////////////

	if (! sections[index - 1]){
		select_link();
	} else {
		//Otherwise subtract 1 from the last value of section to get the current section.
		const current_section = sections[index - 1];
		select_link(current_section.id);
	}
}


/* =============================================================================

============================================================================= */


window.addEventListener('scroll', (event) => {
  get_current_section();

	//////////////////////////////////////////////////////////////////////////////
	//
	//	This last part allows for the final section to be selected, even if we
	//	technically haven't gotten to it yet.
	//	Note: if you want it to switch to the final section BEFORE the end of the
	//	scroll then subtract a number from document.body.offsetHeight.
	//	For example: document.body.offsetHeight - 150
	//
	//////////////////////////////////////////////////////////////////////////////

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight ) {
		const index_of_last_section = sections.length - 1;
		const last_section          =  sections[index_of_last_section];
		const id_of_last_section    = last_section.id;
    select_link(id_of_last_section);
  }
});
