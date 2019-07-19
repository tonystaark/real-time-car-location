
import ReactTooltip from 'react-tooltip';

class Tooltip extends React.Component {
  constructor(){
    this.state = { hover: false };
  }

  render(){
    return <span 
      { ...this.props }
      className={ this.state.hover ? 'showtooltip':'hidetooltip' } 
      onHover={ () => this.setState({ hover: true }) } 
      onMouseOut={ () => this.setState({ hover: false }) } 
    />;
    <ReactTooltip 
    { ...this.props }
    key={i} id={d.id.toString()} effect='solid' 
          // getContent={
          //   (dataTip) => `Car ${dataTip} 
          //   is
          //   ${d.is_on_trip}`
          // }
          
          afterShow={
            () => this.fetchLocation(d.latitude, d.longitude)
          }
          hideShow={
            () => this.setState({location:null})
          }
          
        >
         
          
          {this.state.location && 
            <div>
              <h2 class="tooltip-margin">Car {d.id}</h2>
              <p class="tooltip-margin">{d.is_on_trip ? "On Trip" : "Not On Trip"}</p>
              <div class="tooltip-margin">{this.state.location}</div>
            </div>
           
          }
          {console.log('this',this.state.location)}
        </ReactTooltip>
  }
}

export default Tooltip