var React = require('react');
var LoDash = require('lodash');

// *********************************** Start Using Parent & Child via TutsPlus ************************************************


// *********************************** Parent Portion

var MessageBox = React.createClass({

  getInitialState : function(){
    return {
      isVisible : true,
      title : 'Hello React!',
      messages : []
    };
  },

  componentWillMount : function(){
    if(window.localStorage.getItem('items')){
      var allItems = [];
      var allItems = JSON.parse(window.localStorage.getItem('items'));
      if(allItems){
        this.setState({
          messages : allItems
        });
      }
    }
  },

  render : function(){

    var ParentDisplay = {
      display: this.state.isVisible ? 'block' : 'none'
    };

    var messages = this.state.messages.map(function(message){
      return (
        <li className = "todolist-li">
          <SubMessage  message = {message} onDelete={this._handleDeleteMessage} onUpdate={this._handleUpdateMessage} />
        </li>
      );
    }.bind(this));


    return (

      <div className = "jumbotron col-md-11">
        <h3>{this.state.title}</h3>
        <button className="btn btn-success" onClick = {this._handleShowDiv}> Show </button>
        <div className = "todoList" style={ParentDisplay}>
          <span>This is parent Component!</span>
          <br />
          <form className="form-control">
          <input value = {messages.uid} placeholder = "input message here" ref="newMessage" type="text" />
          <button className = "btn btn-primary" onClick={this._handleAdd} >Add Message</button>
          </form>
          <ul>{messages}</ul>

        </div>
      </div>

    );
  },

  // Parent Component ALl handle Functions

  _handleAdd: function(e){
    var newMessage = this.refs.newMessage.getDOMNode().value;
    var newMessages = this.state.messages;
    newMessages.push(newMessage);
    this.setState({
      messages : newMessages
    });
    this._handleSave(newMessages);
  },

  _handleShowDiv: function(){
    this.setState({
      isVisible : !this.state.isVisible
    });
  },

  _handleDeleteMessage : function(message){
    var newMessages = _.without(this.state.messages, message);
    this.setState({
      messages : newMessages
    });
  },

  _handleUpdateMessage : function(message, value){
    var index;
    index = this.state.messages.indexOf(message);
    this.state.messages[index] = value;
    this.setState({
      messages : this.state.messages
    });
  },

  // _handleEditMessage : function(message){
  //   var newMessages = this.state.message;
  //   newMessages.push(newMessage);
  //   this.setState({
  //     messages : newMessage
  //   });
  // },


  _handleSave : function(items){
    window.localStorage.setItem('items', JSON.stringify(items));
    this.setState({items: items});
  }

});

// *********************************** Child Portion

var SubMessage = React.createClass({

  getInitialState : function(){
    return {
      isVisibleChild : false,
      subtitle : 'This is Child Component!',
      text:null
    };
  },

  render : function(){

    var ChildDisplay = {
      display : this.state.isVisibleChild ? 'block' : 'none'
    };

    return (
      <div>
        <small>{this.state.subtitle}</small>
        <br />
        <div className = "child-message-box">
          <h4 className = "child-message">{this.props.message}</h4>
          <button className="delete btn btn-danger" onClick={this._handleDelete}> Delete </button>
          <button className="delete btn btn-success" onClick={this._handleOption}> Edit </button>

          {this.state.isVisibleChild ?
            <div>
              <input value = {this.state.text} type = "text" onChange={this._handleText} ref="newMessage" />
              <button className="update btn btn-success" onClick={this._handleUpdate}> Update </button>
            </div>
            :
            null
          }

        </div>
      </div>
    );
  },

  _handleOption : function(e){
    var allItems = this.props.message;
    this.state.isVisibleChild = !this.state.isVisibleChild;
    this.setState({
      isVisibleChild : this.state.isVisibleChild
    });
  },

  _handleDelete : function(e){
    this.props.onDelete(this.props.message);
  },

  _handleText:function(e){
    this.setState({text:e.target.value});
  },

  _handleUpdate : function(e){
    this.props.onUpdate(this.props.message, this.state.text);
  },

});

//Final OutputDisplay

var OutputDisplay = React.render(
  <MessageBox />,
  document.getElementById('app')
);


// *********************************** End Using Parent & Child via TutsPlus ************************************************




//
// var TodoApp = React.createClass({
//
//   getInitialState: function(){
//     return {
//       item: 'Hola Amigo, Make Your Todo!',
//       clicks: 0,
//       items: [],
//       text: ''
//     }
//   },
//   componentWillMount : function() {
//     if( window.localStorage.getItem('items') ){
//       var allItems = [];
//       var allItems = JSON.parse(window.localStorage.getItem('items') );
//       if (allItems)
//       this.setState({ items : allItems });
//     }
//   },
//
//   render: function(){
//
//     var showItem = function(item , index){
//       var style = {
//         color : item.color
//       }
//
//       return <li key={item.uid} style={style} data-uid={item.uid}>
//         <h4> {item.name} </h4>
//
//         { item.color != undefined ? item.color : null }
//         <button className = "btn btn-success" value={item.uid} onClick={this._handleOption}>Config Pannel</button>
//
//         {item.isOpen ?
//           <div> <input className = "color-box" value={item.color} placeholder = "input Color" onChange={this._handleChangeColour.bind(this, item)} /> </div>
//           :
//           null
//         }
//       </li>
//     }.bind(this);
//
//     return (
//       <div>
//         <h3>{this.state.item}</h3>
//         <br />
//         <form className="form-control" onSubmit={this._handleSubmit}>
//           <input placeholder = "insert todo item" onChange={this._handleinput} value = {this.state.text} />
//           <button className = "btn btn-primary">Add Todo</button>
//         </form>
//
//         {this.state.items.length ?
//         <ul>
//           {this.state.items.map(showItem)}
//         </ul> : <p> No todos Amigo! </p>}
//
//       </div>
//     );
//   },
//
//
//
//   _handleinput: function(e){
//     this.setState({
//       text: e.target.value
//     });
//   },
//
//   _handleSubmit: function(e){
//     e.preventDefault();
//
//     var allItems  = this.state.items;
//     var newItems  = {
//       uid: new Date().valueOf(),
//       name: this.state.text,
//       isOpen: false
//     };
//
//     if( allItems == undefined || allItems.length == 0 ){
//       allItems = [];
//     }
//
//     allItems.push(newItems);
//     this.setState({
//       items: allItems,
//       text: this.state.text,
//       clicks: this.state.clicks
//     });
//
//     this.setState({
//       text:'',
//     });
//
//     this._handleSave(allItems);
//   },
//
//   _handleOption : function(e){
//     var allItems = this.state.items;
//     allItems.forEach( function( todo ){
//       if( todo.uid == e.target.value ){
//         todo.isOpen = !todo.isOpen;
//       }
//     });
//     this._handleSave(allItems);
//   },
//
//   _handleChangeColour : function(item, e){
//     var allItems = this.state.items;
//     allItems.forEach(function(todo){
//       if ( todo.uid == item.uid ) {
//         todo.color = e.target.value;
//       }
//     });
//     this._handleSave(allItems);
//   },
//
//   _handleSave : function(items){
//     window.localStorage.setItem('items', JSON.stringify(items));
//     this.setState({items: items});
//   }
//
// });
//
// var FinalOutputBox = React.render(
//   <TodoApp />,
//   document.getElementById('app')
// );



// *********************************** Using Parent & Child ************************************************

// var ParentComponent = React.createClass({
//   render: function(){
//     return (
//       <div onClick = {this.props.onClick}> {this.props.title} </div>
//     );
//   }
// });
//
// var ChildComponent = React.createClass({
//   getInitialState: function(){
//     return{
//         items : ['Apple', 'Banana', 'Orange']
//     };
//   },
//   render: function(){
//     return (
//       <div>
//         {this.state.items.map(function(item, i){
//           var boundClick = this._handleClick.bind(this, i);
//           return(
//             <ParentComponent onClick = {boundClick} key={i} title = {item} ref={'item' + i} />
//           );
//         }, this)}
//       </div>
//     );
//   }
// });
