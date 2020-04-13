import React from 'react';
import ActivityItem from './ActivityItem'

function ActivitySelection(props) {
  let activitiesJSON = JSON.parse(window.sessionStorage.getItem('activities'))
  let activitiesKeys = Object.keys(activitiesJSON)
  let activities = activitiesKeys.map(key => activitiesJSON[key])

  return (
    <div className="selection">
      <p>Select some activities <span role="img" aria-label="ticket">🎟️</span></p>
      <form className="selection" onSubmit={props.handleSubmit}>
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