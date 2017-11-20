var contacts ={
    1: {Name: "Andrew Fuller", OfficeNumber : "+919892132456", PersonalNumber : "+919892132456" , Address :"123, new delhi"},
    2: {Name: "Robert King", OfficeNumber : "+919892732896", PersonalNumber : "+917892132456" , Address :"13123, new delhi"},
    3: {Name: "Nancy ", OfficeNumber : "+919452132456", PersonalNumber : "+918892121456" , Address :"123324, new delhi"}
};

var next_contact_id=4;

module.exports ={
    todos:contacts,
    nextcontact: next_contact_id
};