namespace :dashboard do
  desc "TODO"
  task get_data: :environment do
    Site.all.each do |site|
      puts "Querying data for site: #{site.name}"
      url = "#{site.ip_address}/api/malaria_dashboard"
      json_data = RestClient.get(url) rescue ""

      PullTracker.create(
          site_id: site.id,
          status: (json_data.blank? ? "Fail" : "Success"),
          date: Date.today,
          data: json_data
      )
    end
  end
end
