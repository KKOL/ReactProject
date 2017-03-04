function markedUp(text){
     return {__html:text};
}

class Text extends React.Component{
    constructor(props){
         super(props);
         this.state ={
            texte:(textInitial),
         }
     }

    handleChange(e){
         this.setState({
          texte:(e.target.value)
        })
    }

    render(){
         return (
            <div className="text" style={style.viewBox}>
                <div style={style.textForm}>
                    <form>
                      <textarea style={style.textareaSize} onChange={this.handleChange.bind(this)}>
                        {this.state.texte}
                      </textarea>
                    </form>
                </div>
                <TextMarkUp data={this.state.texte}></TextMarkUp>
            </div>
        );
    }
};


class TextMarkUp extends React.Component{
    render(){
         return <div className='textMarkUp' style={style.textMarkUpBox} dangerouslySetInnerHTML={markedUp(marked(this.props.data))}/>;
    }
}

var test = '<h1> Hello React </h1>'
let style = {
    textForm:{
         float:'left',
    },
    viewBox:{
        padding:'50px'
    },

    textareaSize:{
        width:'30vw',
        height:'40vw',
    },

    textMarkUpBox:{
      width:'30vw',
      height:'40vw',
      float:'right',
      'border-radius':'5px',
      border:'2px solid black'
    }
};

let textInitial ='Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*';

ReactDOM.render(
    <Text /> ,
    document.getElementById('view')
)
