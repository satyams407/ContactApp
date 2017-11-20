console.log("in script file");


const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const CONTACTS_LIST_ID = "contacts_list_div";

//loading getContactsAJAX function everytime as page loads
window.onload = getContactsAJAX();


//function to add contacts
function addContactsElements(id, contacts_data_json) {
    var contacts = JSON.parse(contacts_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML = "";
    if (parent) {
        Object.keys(contacts).forEach(
            function (key) {
                var contact_element = createContactElement(key, contacts[key]);
                parent.appendChild(contact_element);
            }
        )
    }
}

//function to create new element
function createContactElement(id, contact_object) {
    var contact_element = document.createElement("div");
    contact_element.appendChild(document.createTextNode(contact_object.Name));
    contact_element.appendChild(document.createTextNode(" "));
    contact_element.appendChild(document.createTextNode(contact_object.PersonalNumber));

    var editbutton = document.createElement("button");
    editbutton.innerText = "Edit";
    editbutton.setAttribute("onclick", "changeContactAJAX("+id+")");
    editbutton.setAttribute("class", "breathHorizontal");
    contact_element.appendChild(editbutton);
    editbutton.setAttribute("data-id", id);
    console.log("in create");
    return contact_element;
}

//get request
function getContactsAJAX() {
    console.log("in get contact ajax");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/contact", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                console.log(xhr.responseText);
                addContactsElements(CONTACTS_LIST_ID , xhr.responseText);
            }
        }
    };
    xhr.send(data = null);
}


function addContactAJAX() {

    console.log("in add");
    var name = document.getElementById("exampleInputName").value;
    var officeNumber = document.getElementById("exampleInputMobileOffice").value;
    var personalNumber = document.getElementById("exampleInputMobileHome").value;
    var address = document.getElementById("exampleInputAddress").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/contact/add", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data  = "&name=" + encodeURIComponent(name) + "&officeNumber="+ encodeURIComponent(officeNumber)
        + "&personalNumber="+encodeURIComponent(personalNumber)
        + "&address="+ encodeURIComponent(address);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                getContactsAJAX();
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
}


function changeContactAJAX(id) {
    window.open("Edit.html","_self");
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/contact/" +id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "edited";
    xhr.onreadystatechange = function () {
        if (xhr.readyState === RESPONSE_DONE) {
            if (xhr.status === STATUS_OK) {
                getContactsAJAX();
            }
            else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.send(data);
    console.log("in change");
}

