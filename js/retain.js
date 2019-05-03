$(function(){

    var model = {
        init: function() {
            /*The property localStorage has access to a Storage local
             *object. localStorage data don't expire. The Web Storage API
             *gives access to storage session or local storage to an
             *specific domain, allowing the author, for example, to add,
             *modify or exclude items stored.
             */
            if (!localStorage.notes) {
                /*Return a JSON string corresponding to the specified
                 *value, optionally including only certain properties
                 *or replacing property values in a user-defined manner.
                 */
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            /*Parse a string as JSON, optionally transform the
             *produced value and its properties, and return the value.
             */
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            console.dir(this);
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            /*The submit event fires when a <form> is submitted.*/
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                /*The handler can check the data, and if there are errors,
                 *show them and call event.preventDefault(), then the form
                 *won’t be sent to the server.
                 */
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});