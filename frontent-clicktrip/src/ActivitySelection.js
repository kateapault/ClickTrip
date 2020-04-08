import React from 'react';
import ActivityItem from './ActivityItem'

function ActivitySelection(props) {
  return (

    <div>
      <form className="selection" onSubmit={props.handleSubmit}>
        <button>This one!</button>
      </form>
      I'm the activity selection container. Here are my activities.
      {props.activities > 0 ? props.activities.map(activity => <ActivityItem activity={activity} />) : 'no activities yet'}
    </div>
  );
}

export default ActivitySelection;