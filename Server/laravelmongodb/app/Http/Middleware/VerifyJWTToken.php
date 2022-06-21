<?php

namespace App\Http\Middleware;

use App\Models\Account;
use Closure;
use Error;
use ErrorException;
use Exception;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Contracts\Providers\JWT;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class VerifyJWTToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        if (is_null($request->bearerToken())) {
            return response()->json(['error' => 'Token required.'], 401);
        }

        try {
            // attempt to verify the credentials and create a token for the user
            $token = JWTAuth::getToken();
            $apy = JWTAuth::getPayload($token)->toArray();

        } catch (TokenExpiredException $e) {

            try
            {        
                $refreshed = JWTAuth::refresh(JWTAuth::getToken());
                $response->header('Authorization', 'Bearer ' . $refreshed);
                $user = JWTAuth::setToken($refreshed)->toUser(); 
            }
            catch (JWTException $e)
            {
                return response()->json(['couldnt refresh token'], 404);
            }
            catch (ErrorException $e1) 
            {
                return response()->json(['error' => 'Refresh Token invalid.', 'status_code' => 401], 401);
            }        

        } catch (TokenInvalidException $e) {

            return response()->json(['error' => 'Token invalid.', 'status_code' => 401], 401);

        } catch (JWTException $e) {

            return response()->json(['token_absent' => $e->getMessage()], 401);
        }
        return $next($request);
    }

}
