class HomeController < ApplicationController

  def main

  end

  def ajax_dashboard
    data = {}
    average_trends = []
    treatments = []

    sites = Site.by_name.each

    sites.each do|site|

      #site_data = PullTracker.by_status.key('Success').first #PullTracker.find_by_sql("SELECT * FROM pull_trackers
                    #WHERE site_id = #{site.id} AND status = 'Success' ORDER BY id DESC LIMIT 1").last
      site_data = JSON.parse(site.data) rescue nil
      next if site_data.blank?
      data[site.name] = {}
      #Rails.logger.debug JSON.parse(site_data).inspect
      data[site.name]["data"] = site_data

      data[site.name]["site_code"] = site.site_code
      data[site.name]["date"] = site_data.date.to_date.to_s
      data[site.name]['obsolete_today'] = (Date.today >  site_data.date.to_date) ? true : false
      data[site.name]['obsolete_month'] = (Date.today.beginning_of_month <=  site_data.date.to_date &&  site_data.date.to_date <= Date.today.end_of_month) ? false : true
      data[site.name]['obsolete_quarter'] = (Date.today.beginning_of_quarter <=  site_data.date.to_date &&  site_data.date.to_date <= Date.today.end_of_quarter) ? false : true
      data[site.name]['obsolete_year'] = (Date.today.beginning_of_year <=  site_data.date.to_date &&  site_data.date.to_date <= Date.today.end_of_year) ? false : true


      treatments << data[site.name]["data"]["dispensation_trends"] rescue []
    end

    if treatments.length > 0
      months = treatments.first
      months.each_with_index do |month, i|
        sum = 0
        treatments.each  do |site_treatments|
          sum += site_treatments[i][1].to_i
        end
        average_trends[i] = [month[0], (sum/treatments.size).round]
      end
    end

    data["average_dispensation_trends"] = average_trends

    render :text => data.to_json
  end
end
