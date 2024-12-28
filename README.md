## Project timeline

    	The "Urban" Project developement offically starts 3/04/2023 and ends 3/06/2023

    	The testing phase start 5/06/2023 to 30/06/2023

    	The testing phase is divided into two phases

    	1. Unit test:

    		Developers are to test all piece of code to ensure reliability within a 10 days time window

    	2. Integration test:

    		All different units, modules or components are to be tested as a combined entity within a 20 days time window.


    	Finally, all memebers of the team are to assume the role of differennt entities and mock app usage to ensure quality.

## Code guide for Urban software developement

    	1. code commenting:

    		All components, modules and lines must be given short description of its usage.

    	2. All entities must contain a "README" file that have a tree-like structure of the current entity flow.

    	3. All list data must be paginated.

    	4. Although firebase handles database code in the background to avoid memory leaks, ensure that all non-firebase long-running code is not executed on the main thread.

    	5. All firebase collections must have the enitity as the collection name. Document names must be set as the user ID string. eg. firebase.collection("Passenger").doc(auth.currentUser.uid).

    	Emails would have been a great name for a document path but firebase is peaky about special characters.
    	All firebase profile field names, collection and document path names will be shared in a github gist to ensure good naming convention and spelling consistency.

    	6. Page setting should be unavailable if a user account is blocked or restricted.

## Timelines for individual features or screens

Park:

    Screen designs: 10 days

    Booking records and dashbaord page: 10 days

    Add park manager, dispatch officer page or feature and request a driver: 10 days

    See all park managers and dispatch officers, set trip and asign verhicle: 10 days

    settings page and track request: 10 days.

    Authentication flow and firebase integration: 10 days.

    NOTE: After a successful login, before navigating to the home page, check the user account type to make sure they logging with the right application. The below example shows a passenger logging in as a fleet owner.

    	Eg. auth.signIn.then({
    		var accountType = await getAccountType();
    		if(accountType != "fleet"){
    			// this user is not a fleet owner. show error
    		}
    	})

    Add and remove park feature: 10 days

    NOTE: Only 1 park can be deleted at a time and the owner must confirm deletion by inputing the park name to confirm he is not deleting by mistake.
# urban-
