import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './result.css';
import { addVenue, removeVenue, editVenue } from './actions';
import Rating from '../edit/Rating';
import Notes from '../edit/Notes';


class ResultDetail extends Component {

  render() {

    const { id } = this.props.match.params; 
    const { results } = this.props;

    const result = results.find(element => {
      return element.venue.id === id;
    });

    const path = result.venue.photos.groups[0].items[0] || null;
    
    const imageUrl = `${path.prefix}original${path.suffix}` || null;

    const { name, url } = result.venue;
    const { phone } = result.venue.contact || null;
    const { address } = result.venue.location;
    const { city } = result.venue.location;
    const { message } = result.venue.price || 'Not Listed';
    const { user, venueLoad } = this.props;


    return (
      <div>
        <div>
          <div>
            <Link to="/">⬅ Back</Link>
            <img src={imageUrl} alt="restaurant"></img>
          </div>

          <div>
            <h3>{name}</h3> 
            <p>Price: {message}</p> 
            <p><Link to={url} alt={name}>{url}</Link></p>
            <p>{phone}</p>
            <p>{address}</p>
            <p>{city}</p>
            {user &&
          <button onClick={addVenue(this.id)}>Save</button>} 
          </div>
        </div>

        {user && 
          (venueLoad[id] &&
            <div>
              {/* <Thumbs/> */}
              <Rating/>
              <Notes id={id}/>
            </div> 
          ) 
        }
      </div>
    );
  }
}

export default connect(
  state => ({ 
    user: state.user, 
    results: state.results,
    venueLoad: state.venueLoad }),
  { addVenue, removeVenue, editVenue }
)(ResultDetail);