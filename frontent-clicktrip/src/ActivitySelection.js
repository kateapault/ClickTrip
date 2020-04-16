import React from 'react';
import ActivityItem from './ActivityItem'
import { getEdit, editBool, getJSON } from './Helper/HelperMethods';

function ActivitySelection(props) {
  let activities = getJSON('activities')
  let edit = editBool(getEdit())
  return (
    <div className="selection">
      <div>{edit ? "Reselect Activities" : "Select some activities"} <span role="img" aria-label="ticket">🎟️</span></div>
      <form onSubmit={props.handleSubmit}>
        {activities.map((activity, index) => 
          <div key={index}>
              <input type="checkbox"
                name="activity-select"
                id={index}
                value={JSON.stringify(activity)}
              />
            <label htmlFor={index} >
              <ActivityItem activity={activity} />
            </label>
          </div>
          )}
          <br></br>
          <button>I want these activities! »</button>
      </form>
    </div>
  );
}

export default ActivitySelection;