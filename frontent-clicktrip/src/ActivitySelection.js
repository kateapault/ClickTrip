import React from 'react';
import ActivityItem from './ActivityItem'

function ActivitySelection(props) {
  let activitiesJSON = JSON.parse(window.sessionStorage.getItem('activities'))
  let activitiesKeys = Object.keys(activitiesJSON)
  let activities = activitiesKeys.map(key => activitiesJSON[key])

  return (
    <div>
      Select some activities 🎟️
      <form className="selection" onSubmit={props.handleSubmit}>
        {activities.map((activity, index) => 
            <label key={index} >
              <input type="checkbox"
                  name="activity-select"
                  value={activity}
              />
              <ActivityItem activity={activity} />
            </label>
          )}
          <br></br>
          <button>I want these activities!</button>
      </form>
    </div>
  );
}

export default ActivitySelection;