namespace :cronjobs do
	desc "To run all cronjob tasks"

	task initiate: :environment do
		system "crontab #{Rails.root}/config/cronjobs.txt"
	end
end