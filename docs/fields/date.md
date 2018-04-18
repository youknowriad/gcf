# Date

**Type:** string

This field allows users to specify a date using a date picker.
The saved format is `YYYY-MM-DDTHH:ii:ss`.

### Template usage

```php
<?php
	$rawValue = get_post_meta( $post_id, $field_name );
	echo date_i18n( get_option( 'date_format' ), strtotime( $rawValue ) );
?>
```
