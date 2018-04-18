# Repeater

**Type:** string (JSON encoded array)

This field is used to store a repeatable list of fields. All other field types can be added as sub fields (except the Free HTML Area).
**Example:** For a CPT representing a person, you can use this field to store a list of addresses or phone numbers.

### Template usage

```php
<?php
	$my_list = json_decode( get_post_meta( $post_id, $field_name ), true );
	foreach ( $my_list as $item ) {
		echo $time['field1']; // field1 is the name of the subfields
	}
?>
```
