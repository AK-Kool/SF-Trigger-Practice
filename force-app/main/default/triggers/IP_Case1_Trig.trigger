trigger IP_Case1_Trig on Case (before insert) 
{
	// When ever a case is created with origin as email then set status as new and Priority as Medium.
	// Origin = Email
	// Set Status = New & Priority = Medium
	for(Case c : trigger.new)
    {
        if(c.Origin == 'Email')
        {
         	c.Status = 'New';
            c.Priority = 'Medium';
        }
    }
}