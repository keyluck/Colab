const moment = require('moment')



module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: function (projectUser, loggedUser, projectId, floating = true) {
        if(projectUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/projects/edit/${projectId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>` 
            } else {
                return `<a href="/projects/edit/${projectId}"> <i class="fas fa-edit"></i></a>`
            }
            
        } else {
            return ''
        }
    },
    select: function (selected, options) {
        return options
        .fn(this)
        .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
        )
        .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
        )
    },
    addMemberIcon: function(projectMember, loggedUser, projectId, floating = true) {

        /* TODO

            If projectMember is not already a group member then send Email to invite
            Use email confirmation link to accept invitation to group project
            then Add user to project's members 
         */
        if(projectUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/projects/group/${projectId}" class="btn-floating halfway-fab blue"><i class="fas fa-user-plus fa-small"></i></a>` 
            } else {
                return `<a href="/projects/group/${projectId}"> <i class="fas fa-user-plus"></i></a>`
            }
            
        } else {
            return ''
        }
    },

  

}