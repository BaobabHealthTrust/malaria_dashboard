class HomeController < ApplicationController

  def main

  end

  def ajax_dashboard
    data = {}
    average_trends = []
    treatments = []
    skip_list = []


    annual_trail = PullTracker.by_date.startkey((Date.today - 1.year).strftime("%Y%m%d")).endkey(Date.today.strftime("%Y%m%d"))
    annual_trail.each do|hash|
      site_code = hash['site_code']
      next if skip_list.include?(site_code)

      last_data = PullTracker.by_site_code_and_date.startkey(site_code + "__" + (Date.today - 1.year).strftime("%Y%m%d"))
      .endkey(site_code + "__" + Date.today.strftime("%Y%m%d")).last
      next if last_data.blank?
      site_name = last_data['site_name']
      date = last_data['date']

      data[site_name] = {}
      data[site_name]["data"] = eval(last_data["data"].gsub(/\\\"/, "'")) rescue last_data["data"]
      data[site_name]["site_code"] = last_data["site_code"]
      data[site_name]["date"] = date.to_date
      data[site_name]['obsolete_today'] = (Date.today >  date.to_date) ? true : false
      data[site_name]['obsolete_month'] = (Date.today.beginning_of_month <=  date.to_date &&  date.to_date <= Date.today.end_of_month) ? false : true
      data[site_name]['obsolete_quarter'] = (Date.today.beginning_of_quarter <=  date.to_date &&  date.to_date <= Date.today.end_of_quarter) ? false : true
      data[site_name]['obsolete_year'] = (Date.today.beginning_of_year <= date.to_date &&  date.to_date <= Date.today.end_of_year) ? false : true

      treatments << data[site_name]["data"]["dispensation_trends"] rescue []

      skip_list << site_code
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
