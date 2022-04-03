#

- Have the app get the user access token for our (baseball-stream) client token

  - https://dev.twitch.tv/docs/authentication#types-of-tokens

- Display the following for a logged-in user:

  - Username
  - Available custom rewards

- Then, allow the user to create custom rewards

  - https://dev.twitch.tv/docs/api/reference#create-custom-rewards
  - Need the following info:
    - Title
    - Cost
    - prompt
    - is_enabled
    - should_redemptions_skip_request_queue

- then
  allow them to choose a reward type and load redemptions
