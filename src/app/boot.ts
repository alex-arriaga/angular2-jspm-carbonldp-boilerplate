// There are files that reference this two dependencies and therefore they get included in the bundled file
// This causes a conflict with angular2-polyfills.js, as that file also declares them
// To avoid this, angular2-polyfills.js is no longer included in the index.html and zone and reflect are declared here instead
import "zone.js";
import "reflect-metadata";

import { bootstrap } from "angular2/platform/browser";
import { provide, enableProdMode, ComponentRef } from "angular2/core";
import { FORM_PROVIDERS } from "angular2/common";
import { ROUTER_PROVIDERS, APP_BASE_HREF } from "angular2/router";
import { HTTP_PROVIDERS } from "angular2/http";

import { appInjector, activeContext, CARBON_PROVIDERS } from "angular2-carbonldp/boot";
import { CARBON_SERVICES_PROVIDERS } from "angular2-carbonldp/services";

import Carbon from "carbonldp/Carbon";

import AppComponent from "./AppComponent";

let carbon:Carbon = new Carbon();
// Here you can configure your carbon context, extend your ObjectSchemas, etc.
// Example:
// carbon.setSetting( "domain", "dev.carbonldp.com" );

// Uncomment the next statement and replace the string with your app slug. After that, delete the Error below.
// activeContext.initialize( carbon, "YOUR-APP-SLUG/" );
throw new Error( "You haven't declared your app slug, please open boot.ts and change line 26" );

if( "true" === "false" ) enableProdMode();

bootstrap( AppComponent, [
	FORM_PROVIDERS,
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,

	provide( APP_BASE_HREF, { useValue: "/src/" } ),

	CARBON_PROVIDERS,
	CARBON_SERVICES_PROVIDERS,
] ).then( ( appRef:ComponentRef ) => {
	appInjector( appRef.injector );
}).catch( ( error ) => {
	console.error( "Couldn't bootstrap the application" );
	console.error( error );
	return Promise.reject( error );
});
