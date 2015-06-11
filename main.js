
var completedTodos = []

$(document).ready(function () {
 page.init();
});

var page = {

  url: 'http://tiy-fee-rest.herokuapp.com/collections/samgraysontodo',

  init: function() {
    page.loadPosts();
    page.initEvent();
    page.amount();
    page.initStyle();
  },

  initStyle: function() {

  },

  initEvent: function() {
    $("#inputForm").on('submit', page.addPost);
    $('.contentAll').on('click', '.deleteButton', page.deletePost);
    $('.bottomNav').on('click', '.bottomRight', function (){

      $('.post').each(function(el) {
        if ($(this).attr('rel') === "yes") {
          console.log('hey');
          completedTodos.push($(this).attr('data-id'));
          console.log(completedTodos);
        }
      });

      page.deleteCompleted(completedTodos);

    });
    $('.contentAll').on('click', '.check', page.completedCheck );
    $('.bottomMiddle').on('click', '#activeTodos', function () {
      $('.contentAll').html('');
      page.loadActive();
    });
    $('.bottomMiddle').on('click', '.completed', function () {
      $('.contentAll').html('');
      page.loadCompleted();
    });
    $('.bottomMiddle').on('click', '.all', function () {
      $('.contentAll').html('');
      page.loadPosts();
    });
  },


  ///////////////
  // Functions //
  ///////////////

  addOnePostToDOM: function (post) {
    page.loadTmpl("postmain", post, $('.contentAll'));
  },

  addAllPostsToDOM: function (allPosts) {
    _.each(allPosts, page.addOnePostToDOM);
  },


// LOADS FROM SERVER //

  loadPosts: function () {

    $.ajax({
      url: page.url,
      method: 'GET',
      success: function (data) {
        // console.log(data);
        $('.contentAll').html('');
        page.addAllPostsToDOM(data);
      },
      error: function (err) {

      }
    });


  },

// POST TO SERVER //

  createPost: function (newPost) {

    $.ajax({
      url: page.url,
      method: 'POST',
      data: newPost,
      success: function (data) {
        page.addOnePostToDOM(data)
        page.amount();
        console.log("success!!: ", data);
      },
      error: function (err) {
        console.log("error ", err);
      }
    });

  },

  addPost: function (event) {
    event.preventDefault();
    var newPost = {
      title: $('input[name="textInput"]').val(),
      completed: "no"
    };
    page.createPost(newPost);
    page.amount();

    $('input[name="textInput"]').val("");
  },

  deletePost: function(event) {
  event.preventDefault();

    $.ajax({
      url: page.url + "/" + $(this).closest('.post').data('id'),
      method: 'DELETE',
      success: function (data) {
        console.log(data);
        $('.contentAll').html('');
        page.loadPosts();
        page.amount();
      }
    });
  },

  deleteCompleted: function() {
  event.preventDefault();

  _.each(completedTodos, function(el,indx,array){
    $.ajax({
      url: page.url + "/" + completedTodos[indx],
      method: 'DELETE',
      success: function (data) {
        console.log("Deleted completed!");
        $('.contentAll').html('');
        page.loadPosts();
        page.amount();
      }
      });
    });

  },


  updatePost: function (editedPost, postId) {

  $.ajax({
    url: page.url + '/' + postId,
    method: 'PUT',
    data: editedPost,
    success: function (data) {
      $('.contentAll').html('');
      page.loadPosts();

    },
    error: function (err) {}
    })

  },


loadTmpl: function (tmplName, data, $target) {
  var compiledTmpl = _.template(page.getTmpl(tmplName));

  $target.append(compiledTmpl(data));
},

getTmpl: function (name) {
  return templates[name];
},


/////////////////////
// Number of toDos //
/////////////////////

amount: function () {

  $.ajax({
    url: page.url,
    method: 'GET',
    success: function (data) {
      // console.log(data);
      $('#amount').html(data.length);
      console.log(data.length)
    },
    error: function (err) {

    }
  });

},

/////////////////////
// Completed Check //
/////////////////////


completedCheck: function (event) {
  event.preventDefault();
  if ($(this).closest('.post').attr('rel') === 'no') {
    $(this).closest('.post').attr('rel','yes');
    $(this).removeClass('fa-circle-thin').addClass('fa-check');

    var itemId = $(this).closest('.post').data('id');

    var updatedItem = {
     completed: $(this).closest('.post').attr('rel')
    };

     page.updatePost(updatedItem, itemId);

  } else if ($(this).closest('.post').attr('rel') === 'yes') {
    $(this).closest('.post').attr('rel','no');
    $(this).removeClass('fa-check').addClass('fa-circle-thin');

    var itemId = $(this).closest('.post').data('id');

    var updatedItem = {
     completed: $(this).closest('.post').attr('rel')
    };

    page.updatePost(updatedItem, itemId);

  };

},

///////////////////
// Select Active //
///////////////////

  loadActive: function (event) {
      $.ajax({
        url: page.url,
        method: 'GET',
        success: function (data) {
          // console.log(data);
          page.addAllPostsToDOM(data);
          page.removeCompleted();
        },
        error: function (err) {

        }
      });
  },

  loadCompleted: function (event) {
      $.ajax({
        url: page.url,
        method: 'GET',
        success: function (data) {
          // console.log(data);
          page.addAllPostsToDOM(data);
          page.removeActive();
        },
        error: function (err) {

        }
      });
  },

  removeCompleted: function() {
    $('.post').each(function(el) {
      if ($(this).attr('rel') === 'yes') {
        console.log('Removed completed!');
        $(this).remove();
      }
    });
  },

  removeActive: function() {
    $('.post').each(function(el) {
      if ($(this).attr('rel') === 'no') {
        console.log('Removed completed!');
        $(this).remove();
      }
    });
  }



}
