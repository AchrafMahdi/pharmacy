<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class MedsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($page)
{
    $search = request('search');        
    if ($page <= 0){
        return response('Page cannot be less or equal to 0', 500);
    }

    // Base URL for the API
    $baseUrl = 'https://medicament.ma';
    
    // Determine the URL based on the page and search query
    if (intval($page) > 1) {
        $url = $baseUrl . "/page/" . $page . "/?choice=specialite&keyword=starts&s=" . urlencode($search);
    } else {
        $url = $baseUrl . "/?choice=specialite&keyword=starts&s=" . urlencode($search);
    }

    // Fetch data from the external API
    $response = Http::get($url);

    // Check for successful response
    if ($response->successful()) {
        // Return the fetched data
        return response($response->body());
    } else {
        return response('Error fetching data', $response->status());
    }
}


    public function search($med,$page)
    {
        if ($page <= 0){
            return response('Page cannot be less or equal to 0', 500);
        }
        // Fetch data from the external API
        $response = null;
        if (intval($page) > 1) {
            $response = Http::get("https://medicament.ma/page/" . $page . "/?choice=specialite&keyword=starts&s=");
        } else {
            $response = Http::get('https://medicament.ma/?choice=specialite&keyword=starts&s=');
        }

        // Check for successful response
        if ($response->successful()) {
            // Return the fetched data
            return response($response->body());
        } else {
            return response('Error fetching data', $response->status());
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
