TESTING *** 


USER
add a user – works, 
	add another (have more than 1) user — NOT YET (google id - null [issue])
		find by ID
			GET all – need more than 1 for it to work
				update - still working on it
					delete - doesn’t work – 
		"message": "Cannot return null for non-nullable field User._id."
assuming this is because of the way the user is saved with googleid not yet configured

other notes : query me (Apollo sandbox)has googleId’s in operation for the sake of confirming that it returns null – testing purposes



CERT
add a cert
	add another (have more than 1) cert
		find by ID
			GET all
				update
					delete


CHAPTER
add a chapter
	add another (have more than 1) chapter
		find by ID
			GET all - stuck here. getting an error, doing this: 
query GETallChapters($certificationId: ID!) {
  chapters(certificationId: $certificationId) {
    title
    _id
  }
}
	why is certID attached to chapters???

	update - seems to work, but without FINDALL working, technically, can’t see it show when wanting to see them all listed
		delete - same as update







notes : there seems to be something off in resolvers, making it not work in testing (apollo sandbox) – moving on to notecard for now.
code is a bit more complicated with this one, as well, thinking we need to tweak something in resolvers
DRAG&DROP
add a drag/drop
	add another (have more than 1) drag/drop
		find by ID
			GET all
				update
					delete



notes : able to add a notecard.
not sure how to toggle the relationship of [chapterId] – for GET ALL
	Although we can’t TECHNICALLY see update and delete reflect in LACK of GETALL, they do show as complete and without any errors, so I’m thinking they are working.
NOTECARD
add a notecard
	add another (have more than 1) notecard – 
		find by ID
			GET all - chapterID required is tripping me up with GET ALL
				update - 
					delete



notes : quiz has a relationship with Chapter – [chapterId]
	could use some help reworking chapter to get quiz done!
QUIZ
add a quiz
	add another (have more than 1) quiz
		find by ID
			GET all
				update
					delete
