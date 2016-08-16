class HomeController < ApplicationController

  def main

  end

  def ajax_dashboard

    data = {}
    average_trends = []
    treatments = []

    Site.all.each do|site|
      site_data = PullTracker.find_by_sql("SELECT * FROM pull_trackers
                    WHERE site_id = #{site.id} AND status = 'Success' ORDER BY id DESC LIMIT 1").last
      next if site_data.blank?
      data[site.name] = {}
      data[site.name]["data"] = JSON.parse(site_data.data)
      data[site.name]["site_code"] = site.site_code
      data[site.name]["date"] = site_data.date.to_date.to_s
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
