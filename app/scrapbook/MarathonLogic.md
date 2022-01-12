# One week and one day are time ranges i.e. Sunday Morning till Saturday Night, 12 midnight till 11:59pm
# These time ranges have a Buffer period when the game resets
# For Weekly, the buffer is one day. Competition starts on Monday at 6:00AM and ends on Saturday 11:59pm of every week
# For Daily, the Buffer is one Hour. Daily range starts at 6:00am and ends at 4:00am following morning
# During buffer, daily activity records are reset.

/*
 * Marathon
 */

# Each week is created in the Database, with a start and an end.
# MarathonWeek Entity collects all users' scores over the week.
# The first user in a week to log on to Afrofit will first look for a valid MarathonWeek and create it if it doesn't exist
# UserScore Entity is has ref to a user, has their score is linked to MarathonWeek (Array)
# Create a total scores entry in User Entity.
# Somehow it must always only record users & return them based on their scores, separating them into their respective leagues
# We need each user's ID, username and score.
# When the week elapses, all these scores are RESET to 0.
# A good way to visualise Marathon is that each of the leagues are just ways to calculate top performers ... e.g.
# Superstar - Top 5, Peak - Next Top 10, Super - Next Top 15, Core - Next Top 20, Rookie - Next Top 50 (Total top hundred)
# When each player's performance is stored, it is written to their record on UserScore and is updated on the MarathonWeek entity
# which is returns when the SaveUserScore endpoint is called

/*
 * Daily User Activity
 */

# When user logs on, look for their DailyUserActivity for the day in DB
# Can't find it? Then create it and record their activity
# Found it? update their identity
# Record only what's needed to display
# Use same endpoint to record their cumulative activity.
# For tomorrow? Create another DB record.
