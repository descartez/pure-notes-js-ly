$(document).ready(function() {

    // Array Remove - By John Resig (MIT Licensed)
    // Used for some remove functions.
    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    // MODEL
    var notes;
    if (JSON.parse(window.localStorage.getItem('notes')) === null) {
        notes = [];
    } else {
        notes = JSON.parse(window.localStorage.getItem('notes'));
    };

    var latestID;
    if (JSON.parse(window.localStorage.getItem('latestid')) === null) {
        latestID = 0;
    } else {
        latestID = JSON.parse(window.localStorage.getItem('latestid'));
    };

    // VIEW
    function View() {};

    View.prototype.itemTemplate = function(note, id) {
        return "<li id='" + id + "'><h1>" + note + "</h1><p class='edit actions'>edit</p><p class='delete actions'>delete</p></li>"
    }

    View.prototype.prependNote = function(note, id) {
        $('ul.list').prepend(this.itemTemplate(note, id))
    }

    View.prototype.editTemplate = function(oldValue) {
        return "<li><textarea class='editted-text' type='text' name='editted-text'>" + oldValue + "</textarea><br><button class='edit-button' type='submit'>change</button><p class='delete actions'>delete</p></li>"
    }


    // CONTROLLER

    function Controller() {};
    Controller.prototype.view = new View();

    Controller.prototype.saveAll = function() {
        window.localStorage.setItem('notes', JSON.stringify(notes));
        window.localStorage.setItem('latestid', JSON.stringify(latestID));
    }

    Controller.prototype.removeNote = function(target) {
        for (index = 0; index < notes.length; index++) {
            if (notes[index].id === parseInt(target, 10)) {
                notes.remove(index);
            }
        }
        this.saveAll();
    }

    Controller.prototype.addTask = function(taskItem) {
        latestID++;
        var newItem = {
            note: taskItem,
            id: latestID
        }
        notes.push(newItem);
        this.view.prependNote(newItem.note, newItem.id);
        this.saveAll();
    }

    Controller.prototype.updateTask = function(target, newItem) {
        for (index = 0; index < notes.length; index++) {
            if (notes[index].id === parseInt(target, 10)) {
                notes[index].note = newItem;
            }
        }
        this.saveAll();
    }

    Controller.prototype.populateList = function() {
        for (index = 0; index < notes.length; index++) {
            this.view.prependNote(notes[index].note, notes[index].id);
        }
    }

    Controller.prototype.launchEventListeners = function() {

        var self = this; //Declared outside so eventlisteners will be given access to controller

        $('#input-button').on('click', function(e) {
            e.preventDefault();
            self.addTask($('#new-note').val());
        });

        $('.list').delegate('.delete', 'click', function() {

            var listItem = $(this).parent();
            var listItemId = listItem.attr('id');
            self.removeNote(listItemId);
            listItem.remove();
        });

        var listItemId; //Declared outside so the .edit button will have access.
        $('.list').delegate('.edit', 'click', function() {

            var listItem = $(this).parent();
            var listItemValue = listItem.children()[0].innerText;
            listItemId = listItem.attr('id');

            var listItemHeader = listItem.children()[0];
            listItem.replaceWith(self.view.editTemplate(listItemValue));
        });

        $('.list').delegate('.edit-button', 'click', function(e) {
            e.preventDefault();

            var listItem = $(this).parent();
            var changedText = listItem.find('textarea').val();

            self.updateTask(listItemId, changedText);
            listItem.replaceWith(self.view.itemTemplate(changedText))
        });
    };

    todo = new Controller();
    todo.populateList();
    todo.launchEventListeners();
})
