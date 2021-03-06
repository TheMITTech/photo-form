# The Tech Photo Uploader

This is a tool for photoeds and photographers---photographers can upload their images and set various attributes about them (event, caption, etc). These will be uploaded to some storage somewhere, and photoeds will be able to log in to an admin area where they can see all the submissions, and ideally eventually move some of them over to the CMS. 

## Photo Uploading Flow
We need some way of identifying the user. This could be simply through them entering their kerb, and maybe having a list of approved uploaders in the database somewhere. Minimally secure but stops attacks hopefully. We could incorporate a PIN with this too, but that gets a bit too complicated perhaps. We could also check the user's certificates to find their kerb that way, which would be simplest but wouldn't work on a phone, unless they have certs there. We could just require that. 

Once the user is authenticated, there will be a place for them to drag and drop images. For each image they choose, a set of fields will pop up:

* Image Preview
* Filename (autogenerated, just a preview) YYYYMMDD-kerb-event-# or some similar format
* Event Name
  * Ideally this would query a database of recent events to give suggestions, in order to stop users from uploading photos for the same event with slightly different titles. Definitely not a priority though.
  * "Apply to Remaining" button allows the user to copy this event name to the rest of the photos they uploaded (after this one)
* Caption
* Date/Time - should autofill from exif but be possible to edit maybe? Or just autofill from exif

## Photoed Flow
If an editor logs in, they should be presented with an easy way to look through the photos that were uploaded, or at a minimum download all photos from the last [time frame] or sorted by event. I would ideally want the editor to be able to do everything from this admin page, but that's unrealistic when we just want to have it working.