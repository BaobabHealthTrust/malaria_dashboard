namespace :dashboard do
  desc "TODO"
  task get_data: :environment do
    Site.by_name.all.each do |site|
      puts "Querying data for site: #{site.name}"
      url = "#{site.ip_address}/api/malaria_dashboard"
      json_data = RestClient.get(url) rescue ""
=begin
      PullTracker.create(
          site_id: site.id,
          status: (json_data.blank? ? "Fail" : "Success"),
          date: Date.today,
          data: json_data
      )
=end
      PullTracker.add_site(site.id, (json_data.blank? ? 'Fail' : 'Success'), Date.today, json_data)

      #system "curl -H \"Content-type:application/json\" -d \"#{json_data}\" -X POST #{url} "
    end
  end
end
