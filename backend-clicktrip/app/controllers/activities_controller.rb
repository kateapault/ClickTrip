class ActivitiesController < ApplicationController

    def index
        @activities = Activity.all
        render json: @activities
    end

    def create
        activity = Activity.new(activity_params)

        if activity.save
            'activity added!'
            render json: activity
        else
            puts 'error! activity not added'
            render json: {error:activity.save.error}
        end
    end

    def update
        activity = Activity.find(params[:id])
        render json: activity.update(activity_params)
    end

    ##################################################################################
    ### DUMMY DATA ###################################################################
    ##################################################################################
    
    def dummysearch
        activities = {activities: [
            {
                name:'Museum of Emmigration',
                location:'43 Liffy Avenue, Dublin, Ireland',
                type:'museum',
                open_time: '10:00',
                close_time: '20:00',
                price: '32.25',
                lat:'',
                long:''
            },
            {
                name:'Rising Museum',
                location:'1 Post Office Rd, Dublin, Ireland',
                type:'museum',
                open_time: '8:00',
                close_time: '18:00',
                price: '22.50',
                lat:'',
                long:''
            },
            {
                name:"Connolley's Bar",
                location:'7 Rising Rd, Dublin, Ireland',
                type:'bar',
                open_time: '10:00',
                close_time: '04:00',
                price: '00.00',
                lat:'',
                long:''
            },
            {
                name:'Haunted Dublin',
                location:'2 Main St, Dublin, Ireland',
                type:'tour',
                open_time: '18:00',
                close_time: '22:00',
                price: '45.00',
                lat:'',
                long:''
            }
        ]}

        render json: activities
    end

    ##################################################################################
    ### EXTERNAL DATA ################################################################
    ##################################################################################

    def search
    end

    private

    def activity_params
        params.require(:activity).permit(:trip_id,:lat,:long,:city,:name,:type,:open_time,:close_time,:price)
    end
end