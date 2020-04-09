import React from 'react';

function ActivityItem(props) {
  return (
    <div className="activity">
      {props.activity.name} | {props.activity.location} | {props.activity.open_time} - {props.activity.close_time} | {props.activity.price} per ticket
    </div>
  );
}

export default ActivityItem;