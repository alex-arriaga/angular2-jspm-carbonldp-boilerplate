import { bootstrap } from "angular2/platform/browser";
import { provide } from "angular2/core";
import { Provider } from "angular2/src/core/di/provider";
import { FORM_PROVIDERS } from "angular2/common";
import { ROUTER_PROVIDERS, APP_BASE_HREF } from "angular2/router";
import { HTTP_PROVIDERS } from "angular2/http";

import Carbon from "carbonldp/Carbon";

import AppComponent from "./AppComponent";
import * as AppContext from "carbonldp/App";

let carbon:Carbon = new Carbon();
carbon.setSetting( "domain", "dev.carbonldp.com" );
carbon.auth.authenticate( "admin@carbonldp.com", "hello" ).then( () => {
	return carbon.apps.get( "test-app/" );
}).then( ( appContext ) => {

	const CARBON_PROVIDER:Provider = provide( Carbon, {
		useValue: carbon,
	} );

	const CARBON_APP_PROVIDER:Provider = provide( AppContext.Context, {
		useValue: appContext,
	} );

	bootstrap( AppComponent, [
		FORM_PROVIDERS,
		ROUTER_PROVIDERS,
		HTTP_PROVIDERS,

		provide( APP_BASE_HREF, { useValue: "/src/" } ),

		CARBON_PROVIDER,
		CARBON_APP_PROVIDER,
	] );
}).catch( ( error ) => {
	console.error( "Couldn't initialize carbon's app context" );
	console.error( error );
});
