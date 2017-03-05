
/******************************************************
          REACT CODE

*******************************************************/
class CampersImage extends React.Component{
  render(){
    return <img class="campersImage" src={this.props.image_url} alt="No Image"/>
  }
}

/*******************************************************/
class CampersUserName extends React.Component{
  render(){
    return(
      <div class= "campersUserName">{this.props.name}</div>
    )
  }
}

/*******************************************************/


/*******************************************************/
class CampersList extends React.Component{
  constructor(props){
     super(props);
     this.state = {
       data:[],
       recent:true,
       alltime:false,
       status:'recent'
     };
    this.handleChange = this.handleChange.bind(this);
    this.recentClick = this.recentClick.bind(this);
    this.alltimeClick = this.alltimeClick.bind(this);
 }

  getData(){
    $.ajax({

         url:"https://fcctop100.herokuapp.com/api/fccusers/top/"+this.state.status,
         type:"GET",
         dataType:"JSON",

         success:function(data){
           //console.log(data[0][this.state.status]);
           var sortData = data.sort((first,second)=>first[this.state.status]-second[this.state.status]).reverse();
           this.setState({
             data:sortData,
           })
         }.bind(this),// important to bind the succes function here

         // add error handling

       })// end of ajax call
 }

  componentDidMount(){
    this.getData()
 }

  handleChange(e){
    this.setState(prevState=>({
      data:prevState.data.reverse()
    }))
  }

 recentClick(){
   if(this.state.status==='alltime'){
     this.setState({status:"recent"});
     this.getData()
   }
 }

 alltimeClick(){
     if(this.state.status==='recent'){
     this.setState({status:"alltime"});
     this.getData();
   }
}

render(){
         const List = this.state.data.map(function(camper, index){
                return (
                    <tr className={index%2===0?'paire':'impaire'}>
                    <th className="index">{(index+1).toString()}</th>
                     <th className="item">
                       <CampersImage image_url={camper.img}/>
                       <CampersUserName name={camper.username}/>
                        </th>
                     <th className="item">{camper.recent}</th>
                     <th className="item">{camper.alltime}</th>
                   </tr>

                )
   });

      return (
          <table>
            <tr>
              <th className="index"> Rang </th>
              <th className="item"> Camper Name</th>
              <th className="item" onClick = {this.recentClick}> Points in 30 last Days </th>
              <th className="item" onClick = {this.alltimeClick}> All time Point </th>
              </tr>

            {List}
            </table>
        )
    }
}

/*******************************************************/
class BoardTable extends React.Component{
    render(){
        return (
          <div className="boardTable">
            <h2> LeaderBoard</h2>
            <CampersList/>
          </div>
        )
    }
}

/*******************************************************/
ReactDOM.render(
    <BoardTable/>,
    document.getElementById("campers_list")
)
