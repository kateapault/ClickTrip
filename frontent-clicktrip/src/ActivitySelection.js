import React from 'react';
import ActivityItem from './ActivityItem'

function ActivitySelection(props) {
  return (

    <div>
      I'm the activity selection container. Here are my activities.
      {props.activities.length > 0 ? props.activities.map(activity => <ActivityItem activity={activity} />) : 'no activities yet'}
    </div>
  );
}

export default ActivitySelection;