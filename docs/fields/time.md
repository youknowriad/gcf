# Time

**Type:** string

This field allows users to specify a time (hour and minutes).
The saved format is `YYYY-MM-DDTHH:ii:ss`.

### Template usage

```php
<?php
	$rawValue = get_post_meta( $post_id, $field_name );
	echo date( 'H:i', strtotime( $rawValue ) );
?>
```
