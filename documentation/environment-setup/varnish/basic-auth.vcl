# Temporary basic auth in front of environments

vcl 4.0;

sub vcl_recv {
  # foo:bar - replace with actual user/pass - generate like this:
  # echo -n "foo:bar" | base64
  if (req.http.host ~ "^(prod|stage|test)\.web\.sl2017\.dk$" && ! client.ip ~ noauth && ! req.method == "BAN" && req.http.User-Agent !~ "Google Page Speed Insights" && ! req.http.Authorization ~ "Basic Zm9vOmJhcg==") {
    return(synth(401, "Restricted"));
  }

  unset req.http.Authorization;
}

sub vcl_synth {
    if (resp.status == 401) {
        set resp.http.WWW-Authenticate = "Basic";
    }
}
